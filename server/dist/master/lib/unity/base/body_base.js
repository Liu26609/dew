"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.body_base = void 0;
const common_1 = __importDefault(require("../../common"));
const FACE_BODY_1 = require("../../face/FACE_BODY");
const SKILL_1 = require("../../skill/SKILL");
const body_com_1 = require("./body_com");
const bags_1 = __importDefault(require("../../bag/bags"));
const shareFace_1 = require("../../../../shared/shareFace");
const xlsxToJson_1 = __importDefault(require("../../../../model/xlsxToJson"));
class body_base {
    constructor() {
        this.id = '';
        this.name = '未命名的单位';
        this.attList = [];
        this._buff_source = new Map();
        /**
         * buff 来源
         * 层数
         * 具体效果
         */
        this._group = FACE_BODY_1.battle_group.主场;
        this.sk_auto = [];
        this.sk_active = [];
        this.wallet = [];
        this._messageid = '';
        this._battle = undefined;
        this._battleLs = undefined;
        this.bag = new bags_1.default();
        this.sys = '修仙';
    }
    /**
     * 获取角色当前等级的体系称谓
     */
    get_className() {
        let list = xlsxToJson_1.default.cfg.get(`sys_称谓_${this.sys}`);
        let leve = this.get_att(shareFace_1._att_key.等级).getVal();
        if (list.has(leve)) {
            return list.get(leve).name;
        }
        let classList = [...list.keys()];
        classList.sort((a, b) => a - b);
        let closest = classList[0];
        for (let i = 1; i < classList.length; i++) {
            if (classList[i] > leve) {
                break;
            }
            closest = classList[i];
        }
        return list.get(closest);
    }
    set_battleLs(ls) {
        this._battleLs = ls;
    }
    get_battleLs() {
        return this._battleLs;
    }
    set_battle(b) {
        this._battle = b;
    }
    get_battle() {
        return this._battle;
    }
    addItem(data) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            switch (element.type) {
                case shareFace_1.Item_Type.道具:
                    this._addItem_道具(element);
                    break;
                case shareFace_1.Item_Type.技能书:
                    this.bag.addItem(element);
                    break;
                default:
                    console.error('未实现功能', element.type);
                    break;
            }
        }
    }
    wallet_add(key, val) {
        if (!this.wallet[key]) {
            this.wallet[key] = 0;
        }
        this.wallet[key] += val;
    }
    _addItem_道具(data) {
        switch (data.name) {
            case '金币':
                this.wallet_add(data.name, data.cont);
                break;
            case 'EXP':
                this._addExp(data.cont);
                break;
            default:
                this.bag.addItem(data);
                break;
        }
    }
    _addExp(exp) {
        let att_exp = this.get_att(shareFace_1._att_key.经验值);
        if (!att_exp) {
            this.attList.push(new body_com_1.body_bar({ name: 'EXP', key: shareFace_1._att_key.经验值, max: 100, now: 0 }));
            att_exp = this.get_att(shareFace_1._att_key.经验值);
        }
        let v = att_exp.getVal();
        att_exp.setVal(v + exp);
        while (att_exp.getVal() >= att_exp.getMax()) {
            att_exp.setVal(att_exp.getVal() - att_exp.getMax());
            let leve = this.get_att(shareFace_1._att_key.等级);
            leve.setVal(leve.getVal() + 1);
            att_exp.setMax(att_exp.getMax() + leve.getVal() * 100);
        }
    }
    add_buff(key, name, round = 1, val, source) {
        let _buff = this._buff_source.get(key) || new Map();
        let item = _buff.get(name);
        if (item) {
            item.round += round;
            if (val > 0 && item.val < val || val < 0 && item.val > val) {
                item.val = val;
                item.source = source;
            }
        }
        else {
            item = { source: source, round: round, val: val, name: name };
        }
        _buff.set(name, item);
        this._buff_source.set(key, _buff);
    }
    get_buffVal(key) {
        let b = this._buff_source.get(key);
        if (!b) {
            return 0;
        }
        let val = 0;
        b.forEach((item, key) => {
            val += item.val;
        });
        return val;
    }
    set_conn(conn, messageid) {
        this._messageid = messageid;
        this._conn = conn;
    }
    sendMessageg(msgName, msg) {
        if ('messageId' in msg) {
            msg.messageId = this._messageid;
        }
        if (this._conn && this._messageid.length > 0) {
            this._conn.sendMsg(msgName, msg);
        }
        else {
            console.error('消息发送失败', this.name);
        }
    }
    set_group(g) {
        this._group = g;
    }
    get_group() {
        return this._group;
    }
    addBuff() {
    }
    _reload(data) {
        if (!data) {
            console.error('reload 初始化不存在');
            return;
        }
        const typeMap = {
            'body_bar': body_com_1.body_bar,
            'att_val': body_com_1.att_val
        };
        this.name = data.name || '未命名';
        this.id = data.id || common_1.default.v4();
        if (data.attList) {
            for (let index = 0; index < data.attList.length; index++) {
                const element = data.attList[index];
                const TypeClass = typeMap[element.t];
                if (!TypeClass) {
                    console.error('TypeClass 不存在', element.t);
                }
                this.attList.push(new TypeClass(element));
            }
        }
        // 背包
        if (data.bag) {
            this.bag.items = data.bag.items;
        }
        // 主动技能reload
        if (data.sk_active) {
            for (let i = 0; i < data.sk_active.length; i++) {
                const name = data.sk_active[i];
                this.addSk_active(name);
            }
        }
        // 被动技能reload
        if (data.sk_auto) {
            for (let i = 0; i < data.sk_auto.length; i++) {
                const element = data.sk_auto[i];
                this.addSk_auto(new SKILL_1.SKILL(element));
            }
        }
    }
    /**
     * 弃用
     */
    pushSkill(data) {
        this.addSk_active(data);
    }
    addSk_auto(data) {
        this.sk_auto.push(data);
    }
    addSk_active(data) {
        this.sk_active.push(new SKILL_1.SKILL(data));
    }
    /**此单位战斗回合开始 */
    battle_round_begins(bt) {
        if (this.is_die()) {
            return;
        }
        // 1.过滤出CD符合的技能
        let availableSkills = this.sk_active.filter(skill => skill.next_round() == 0);
        if (availableSkills.length === 0) {
            console.log('No cd skills');
            return;
        }
        // 1.技能选择 - 根据CD决定
        let sk = availableSkills[common_1.default.random(0, availableSkills.length - 1)];
        // 2.技能释放 - 目标选择技能决定
        sk.use(this, bt);
    }
    battle_round_end(bt) {
        this._buff_source.forEach((val, key) => {
            if (val.size == 0) {
                this._buff_source.delete(key);
            }
            else {
                val.forEach((item, key) => {
                    item.round -= 1;
                    if (item.round <= 0) {
                        val.delete(key);
                    }
                });
            }
        });
    }
    is_die() {
        let att = this.get_att(shareFace_1._att_key.生命值);
        if (!att) {
            console.error('Attribute not found:', shareFace_1._att_key.生命值);
            return true;
        }
        let v = att.getVal();
        return v <= 0;
    }
    get_att(key) {
        let idx = this.attList.findIndex((item, idx) => {
            return (item.key == key || item.name == key);
        });
        if (idx == -1) {
            return undefined;
        }
        return this.attList[idx];
    }
    // 受到伤害
    damage(val, bt) {
        let att = this.get_att(shareFace_1._att_key.生命值);
        if (att) {
            let v = att.getVal();
            v -= val;
            att.setVal(v);
        }
        else {
            console.error('Attribute not found:', shareFace_1._att_key.生命值);
        }
        if (bt) {
            bt.log_data('承伤', this._group, this.name, val);
        }
    }
    resHp(val, bt) {
        let att = this.get_att(shareFace_1._att_key.生命值);
        if (att) {
            let v = att.getVal();
            v += val;
            let max = att.getMax();
            if (v > max) {
                v = max;
            }
            att.setVal(v);
        }
        else {
            console.error('Attribute not found:', shareFace_1._att_key.生命值);
        }
        if (bt) {
            bt.log_data('治疗', this._group, this.name, val);
        }
    }
}
exports.body_base = body_base;
