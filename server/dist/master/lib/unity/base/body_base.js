"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.body_base = void 0;
const common_1 = __importDefault(require("../../common"));
const FACE_BODY_1 = require("../../face/FACE_BODY");
const SKILL_1 = require("../../skill/SKILL");
const body_com_1 = require("./body_com");
const shareFace_1 = require("../../../../shared/protocols/shareFace");
const xlsxToJson_1 = __importDefault(require("../../../../model/xlsxToJson"));
const inherit_1 = require("./inherit");
const bags_1 = __importStar(require("./bags"));
const MsgAction_1 = require("../../../../shared/master/MsgAction");
const PtlFace_1 = require("../../../../shared/PtlFace");
class body_base {
    constructor() {
        this.id = '';
        this.name = '未命名的单位';
        // 基础属性
        this.attList = [];
        this.leve = new body_com_1.att_val({ key: shareFace_1._att_key.等级, val: 1, hide: true });
        this.fight = new body_com_1.att_val({ key: shareFace_1._att_key.战斗力, val: 0 });
        this.exp = new body_com_1.body_bar({ key: shareFace_1._att_key.经验值, max: 100, now: 0 });
        this.hp = new body_com_1.body_bar({ key: shareFace_1._att_key.生命值, max: 100, now: 100 });
        this.hp_res = new body_com_1.att_val({ key: shareFace_1._att_key.生命恢复, val: 1 });
        this.mp = new body_com_1.body_bar({ key: shareFace_1._att_key.魔法值, max: 100, now: 100 });
        this.mp_res = new body_com_1.att_val({ key: shareFace_1._att_key.魔法恢复, val: 0 });
        this.dong_hp = new body_com_1.att_val({ key: shareFace_1._att_key.生命护盾, val: 0 });
        this.dong_mp = new body_com_1.att_val({ key: shareFace_1._att_key.魔法护盾, val: 0 });
        this.dong_phy = new body_com_1.att_val({ key: shareFace_1._att_key.物理护盾, val: 0 });
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
        this.sys = '修仙';
        // 继承血统
        this.inherit = new inherit_1.inherit();
        this.equips = [];
        this._outAtt = [];
        this._needUpdate = false;
        this.bag = new bags_1.default(this);
    }
    /**
     * 脱装备
     */
    takeOffEquip(idx) {
        if (idx < 0 || idx >= this.equips.length) {
            this.sendMessageg('Action', {
                template: MsgAction_1.template.文本消息,
                data: `[卸下装备]装备ID：${idx + 1}不存在`,
                messageId: ''
            });
            return;
        }
        let eq = this.equips[idx];
        if (!eq) {
            this.sendMessageg('Action', {
                template: MsgAction_1.template.文本消息,
                data: `[卸下装备]装备ID：${idx + 1}不存在`,
                messageId: ''
            });
            return;
        }
        this.addItem({
            type: PtlFace_1.Item_Type.装备,
            name: eq.name,
            cont: 1,
            data: eq
        });
        this.equips[idx] = undefined;
        this.sendMessageg('Action', {
            template: MsgAction_1.template.文本消息,
            data: `[卸下装备]装备ID：${idx + 1}已放入背包`,
            messageId: ''
        });
        this.refAtt();
        this.sendMessageg('Action', {
            template: MsgAction_1.template.文本消息,
            data: `[卸下装备]发送最新的战力变化`,
            messageId: '',
            delaytime: 1
        });
    }
    /**
     * 穿装备
     */
    wearEquip(e) {
        this.equips.push(e);
        this.sendMessageg('Action', {
            template: MsgAction_1.template.文本消息,
            data: `[装备成功]装备名称${e.name}已穿戴`,
            messageId: ''
        });
        this.refAtt();
        this.sendMessageg('Action', {
            template: MsgAction_1.template.文本消息,
            data: `[装备成功]发送最新的战力变化`,
            messageId: '',
            delaytime: 1
        });
        return true;
    }
    /**
     * 获取角色当前等级的体系称谓
     */
    get_className() {
        let list = xlsxToJson_1.default.cfg.get(`sys_称谓_${this.sys}`);
        let leve = this.leve.getVal();
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
        this.refAtt();
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
                case PtlFace_1.Item_Type.道具:
                    this._addItem_道具(element);
                    break;
                case PtlFace_1.Item_Type.技能书:
                    this.bag.addItem(element);
                    break;
                case PtlFace_1.Item_Type.装备:
                    this.bag.addItem(element);
                    break;
                default:
                    console.error('未实现功能', element.type);
                    break;
            }
        }
    }
    wallet_get(key) {
        let item = this.wallet.find((item) => {
            return item.key == key;
        });
        if (item) {
            return item.val;
        }
        return 0;
    }
    wallet_add(key, val) {
        if (!this.wallet[key]) {
            this.wallet[key] = 0;
        }
        this.wallet[key] += val;
    }
    _addItem_道具(data) {
        switch (data.name) {
            case bags_1.itemSysName.金币:
                this.wallet_add(data.name, data.cont);
                break;
            case bags_1.itemSysName.经验:
                this._addExp(data.cont);
                break;
            default:
                this.bag.addItem(data);
                break;
        }
    }
    _addExp(exp) {
        let v = this.exp.getVal();
        this.exp.setVal(v + exp);
        while (this.exp.getVal() >= this.exp.getMax()) {
            this.exp.setVal(this.exp.getVal() - this.exp.getMax());
            this.leve.setVal(this.leve.getVal() + 1);
            this.exp.setMax(this.exp.getMax() + this.leve.getVal() * 100);
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
        data.exp && (this.exp = new body_com_1.body_bar(data.exp));
        data.leve && (this.leve = new body_com_1.att_val(data.leve));
        data.fight && (this.fight = new body_com_1.att_val(data.fight));
        data.hp && (this.hp = new body_com_1.body_bar(data.hp));
        data.hp_res && (this.hp_res = new body_com_1.att_val(data.hp_res));
        data.mp && (this.mp = new body_com_1.body_bar(data.mp));
        data.mp_res && (this.mp_res = new body_com_1.att_val(data.mp_res));
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
        if (!data.inherit) {
            this.inherit = new inherit_1.inherit();
        }
        else {
            this.inherit = new inherit_1.inherit(data.inherit);
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
                this.addSk_auto(element);
            }
        }
        this.updateAtt();
    }
    _get_equipVal(key) {
        let equips = this.equips;
        // 装备属性
        let val = 0;
        for (let j = 0; j < equips.length; j++) {
            const equip = equips[j];
            if (!equip) {
                continue;
            }
            val += equip.get_att(key);
        }
        return val;
    }
    updateAtt() {
        if (!this._needUpdate) {
            return;
        }
        this._needUpdate = false;
        // 最终属性=
        // 角色基础属性 + 血统属性 * 角色等级 + 装备属性
        // 特殊处理:护盾
        let leve = this.leve.getVal();
        this.hp.setMax(this.hp.getVal() + this.inherit.get_att(shareFace_1._att_key.生命值) * leve + this._get_equipVal(shareFace_1._att_key.生命值));
        this.hp_res.setVal(this.hp_res.getVal() + this.inherit.get_att(shareFace_1._att_key.生命恢复) * leve + this._get_equipVal(shareFace_1._att_key.生命恢复));
        this.mp.setMax(this.mp.getVal() + this.inherit.get_att(shareFace_1._att_key.魔法值) * leve + this._get_equipVal(shareFace_1._att_key.魔法值));
        this.mp_res.setVal(this.mp_res.getVal() + this.inherit.get_att(shareFace_1._att_key.魔法恢复) * leve + this._get_equipVal(shareFace_1._att_key.魔法恢复));
        // TODO:护盾有bug 暂时不加
        // this.dong_hp.setVal(this.dong_hp.getVal() + this.inherit.get_att(_att_key.生命护盾) * leve)
        // this.dong_mp.setVal(this.dong_mp.getVal() + this.inherit.get_att(_att_key.魔法护盾) * leve)
        // this.dong_phy.setVal(this.dong_phy.getVal() + this.inherit.get_att(_att_key.物理护盾) * leve)
        let base = this.attList;
        let out = [];
        let equips = this.equips;
        for (let i = 0; i < base.length; i++) {
            const element = base[i];
            let val = element.getVal() + this.inherit.get_att(element.key);
            // 装备属性
            for (let j = 0; j < equips.length; j++) {
                const equip = equips[j];
                if (!equip) {
                    continue;
                }
                val += equip.get_att(element.key);
            }
            out.push(new body_com_1.att_val({ key: element.key, val: val }));
        }
        this._outAtt = out;
    }
    refAtt() {
        this._needUpdate = true;
    }
    get_outAtt() {
        this.updateAtt();
        return this._outAtt;
    }
    active() {
        this.refAtt();
    }
    addSk_auto(data) {
        let _data = data;
        if (typeof (data) == 'string') {
            _data = { name: data, type: shareFace_1.SKILL_type.被动技能 };
        }
        else {
            _data.type = shareFace_1.SKILL_type.被动技能;
        }
        this.sk_auto.push(new SKILL_1.SKILL(_data));
    }
    addSk_active(data) {
        let _data = data;
        if (typeof (data) == 'string') {
            _data = { name: data, type: shareFace_1.SKILL_type.主动技能 };
        }
        else {
            _data.type = shareFace_1.SKILL_type.主动技能;
        }
        try {
            this.sk_active.push(new SKILL_1.SKILL(_data));
        }
        catch (error) {
            debugger;
        }
        return true;
    }
    /**
     * 移除自身技能
     * @param idx
     */
    rm_skill(idx) {
        if (idx < 0 || idx >= this.sk_active.length) {
            return;
        }
        this.sk_active.splice(idx, 1);
    }
    /**
     * 接收到触发事件
     * 遍历自身触发效果
     */
    trigger(condition, tag, bt) {
        let allSkill = this.get_skill_all(true);
        allSkill.forEach((sk) => {
            sk.trigger_tick(condition, this, tag, bt);
        });
    }
    /**
     *
     * @returns 获取所有技能
     */
    get_skill_all(auto = false) {
        let allSkill = [];
        allSkill = allSkill.concat(this.sk_active);
        allSkill = allSkill.concat(this.inherit.sk_active);
        if (auto) {
            allSkill = allSkill.concat(this.sk_auto);
            // allSkill = allSkill.concat(this.inherit.sk_auto);
        }
        return allSkill;
    }
    /**此单位战斗回合开始 */
    battle_round_begins(bt) {
        if (this.is_die()) {
            return;
        }
        let allSkill = this.get_skill_all();
        // 1.过滤出CD符合的技能
        let availableSkills = allSkill.filter(skill => skill.next_round() == 0);
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
        let v = this.hp.getVal();
        return v <= 0;
    }
    get_att(key) {
        this.updateAtt();
        switch (key) {
            case shareFace_1._att_key.战斗力:
                return this.fight;
            case shareFace_1._att_key.等级:
                return this.leve;
            case shareFace_1._att_key.生命值:
                return this.hp;
            case shareFace_1._att_key.生命恢复:
                return this.hp_res;
            case shareFace_1._att_key.魔法值:
                return this.mp;
            case shareFace_1._att_key.魔法恢复:
                return this.mp_res;
            case shareFace_1._att_key.经验值:
                return this.exp;
            case shareFace_1._att_key.生命护盾:
                return this.dong_hp;
            case shareFace_1._att_key.魔法护盾:
                return this.dong_mp;
            case shareFace_1._att_key.物理护盾:
                return this.dong_phy;
            default:
                break;
        }
        let idx = this._outAtt.findIndex((item, idx) => {
            return (item.key == key || item.name == key);
        });
        if (idx == -1) {
            return undefined;
        }
        return this._outAtt[idx];
    }
    // 受到伤害
    damage(tag, val, bt) {
        let v = this.hp.getVal();
        v -= val;
        this.hp.setVal(v);
        if (bt) {
            bt.log_data('承伤', this._group, this.name, val);
            bt.log_data('伤害', tag.get_group(), tag.name, val);
        }
    }
    resHp(val, bt) {
        let v = this.hp.getVal();
        v += val;
        let max = this.hp.getMax();
        if (v > max) {
            v = max;
        }
        this.hp.setVal(v);
        if (bt) {
            bt.log_data('治疗', this._group, this.name, val);
        }
    }
}
exports.body_base = body_base;
