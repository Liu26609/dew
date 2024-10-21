import { WsClient } from "tsrpc";
import { ServiceType } from "../../../../shared/master/serviceProto";
import { battle } from "../../battle/battle";
import common from "../../common";
import { battle_group } from "../../face/FACE_BODY";
import { SKILL } from "../../skill/SKILL";
import { att_line, att_val, body_bar } from "./body_com"
import bags from "../../bag/bags";
import { _att_key, Item_Type, prop_item } from "../../../../shared/shareFace";
import xlsxToJson from "../../../../model/xlsxToJson";
import { inherit } from "./inherit";
export class body_base {
    id: string = '';
    name: string = '未命名的单位';
    // 基础属性
    attList: att_val[] = [];

    leve: att_val = new att_val({ key: _att_key.等级, val: 1, hide: true })
    fight: att_val = new att_val({ key: _att_key.战斗力, val: 0 })
    exp: body_bar = new body_bar({ key: _att_key.经验值, max: 100, now: 0 })


    hp: body_bar = new body_bar({ key: _att_key.生命值, max: 100, now: 100 })
    hp_res: att_val = new att_val({ key: _att_key.生命恢复, val: 1 })
    mp: body_bar = new body_bar({ key: _att_key.魔法值, max: 100, now: 100 })
    mp_res: att_val = new att_val({ key: _att_key.魔法恢复, val: 0 })

    dong_hp: att_val = new att_val({ key: _att_key.生命护盾, val: 0 })
    dong_mp: att_val = new att_val({ key: _att_key.魔法护盾, val: 0 })
    dong_phy: att_val = new att_val({ key: _att_key.物理护盾, val: 0 })

    private _buff_source: Map<string, Map<string, any>> = new Map();
    /**
     * buff 来源
     * 层数
     * 具体效果
     */
    private _group: battle_group = battle_group.主场;
    sk_auto: SKILL[] = [];
    sk_active: SKILL[] = [];
    wallet: { key: string, val: number }[] = []
    private _conn: any;
    private _messageid: string = '';
    private _battle: battle | undefined = undefined;
    private _battleLs: any = undefined;
    bag: bags = new bags();
    sys: string = '修仙';
    // 继承血统
    inherit: inherit = new inherit();
    private _outAtt: (att_line | att_val | body_bar)[] = []
    private _needUpdate: boolean = false;
    constructor() {

    }
    /**
     * 获取角色当前等级的体系称谓
     */
    get_className() {
        let list = xlsxToJson.cfg.get(`sys_称谓_${this.sys}`) as unknown as Map<number, any>;
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
    set_battleLs(ls: any) {
        this._battleLs = ls;
    }
    get_battleLs() {
        return this._battleLs;
    }
    set_battle(b: battle | undefined) {
        this._battle = b;
        this.refAtt();
    }
    get_battle() {
        return this._battle
    }
    addItem(data: prop_item | prop_item[]) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            switch (element.type) {
                case Item_Type.道具:
                    this._addItem_道具(element);
                    break;
                case Item_Type.技能书:
                    this.bag.addItem(element);
                    break;
                default:
                    console.error('未实现功能', element.type);
                    break;
            }
        }
    }
    wallet_add(key: string, val: number) {
        if (!this.wallet[key]) {
            this.wallet[key] = 0;
        }
        this.wallet[key] += val;
    }
    private _addItem_道具(data: any) {
        switch (data.name) {
            case '金币':
                this.wallet_add(data.name, data.cont)
                break;
            case 'EXP':
                this._addExp(data.cont)
                break;
            default:
                this.bag.addItem(data);
                break;
        }
    }
    private _addExp(exp: number) {
        let v = this.exp.getVal();
        this.exp.setVal(v + exp)
        while (this.exp.getVal() >= this.exp.getMax()) {
            this.exp.setVal(this.exp.getVal() - this.exp.getMax())
            this.leve.setVal(this.leve.getVal() + 1);
            this.exp.setMax(this.exp.getMax() + this.leve.getVal() * 100)
        }
    }
    add_buff(key: string, name: string, round: number = 1, val: number, source: body_base) {
        let _buff = this._buff_source.get(key) || new Map();
        let item = _buff.get(name);
        if (item) {
            item.round += round;
            if (val > 0 && item.val < val || val < 0 && item.val > val) {
                item.val = val;
                item.source = source;
            }
        } else {
            item = { source: source, round: round, val: val, name: name }
        }
        _buff.set(name, item);
        this._buff_source.set(key, _buff);
    }
    get_buffVal(key: string) {
        let b = this._buff_source.get(key);
        if (!b) {
            return 0
        }
        let val = 0;
        b.forEach((item, key) => {
            val += item.val;
        })
        return val;
    }
    set_conn(conn: WsClient<ServiceType>, messageid: string) {
        this._messageid = messageid;
        this._conn = conn;
    }
    sendMessageg<T extends string & keyof ServiceType['msg']>(msgName: T, msg: ServiceType['msg'][T]) {
        if ('messageId' in msg) {
            msg.messageId = this._messageid;
        }

        if (this._conn && this._messageid.length > 0) {
            this._conn.sendMsg(msgName, msg)
        } else {
            console.error('消息发送失败', this.name)
        }
    }
    set_group(g: battle_group) {
        this._group = g;
    }
    get_group() {
        return this._group;
    }
    addBuff() {

    }
    _reload(data?: any) {
        if (!data) {
            console.error('reload 初始化不存在');
            return;
        }
        const typeMap = {
            'body_bar': body_bar,
            'att_val': att_val
        };
        this.name = data.name || '未命名';
        this.id = data.id || common.v4();
        data.exp && (this.exp = new body_bar(data.exp))
        data.leve && (this.leve = new att_val(data.leve))
        data.fight && (this.fight = new att_val(data.fight))
        data.hp && (this.hp = new body_bar(data.hp))
        data.hp_res && (this.hp_res = new att_val(data.hp_res))
        data.mp && (this.mp = new body_bar(data.mp))
        data.mp_res && (this.mp_res = new att_val(data.mp_res))

        if (data.attList) {
            for (let index = 0; index < data.attList.length; index++) {
                const element = data.attList[index];
                const TypeClass = typeMap[element.t];
                if (!TypeClass) {
                    console.error('TypeClass 不存在', element.t)
                }
                this.attList.push(new TypeClass(element))
            }
        }
        if (!data.inherit) {
            this.inherit = new inherit();
        } else {
            this.inherit = new inherit(data.inherit);
        }
        // 背包
        if (data.bag) {
            this.bag.items = data.bag.items;
        }
        // 主动技能reload
        if (data.sk_active) {
            for (let i = 0; i < data.sk_active.length; i++) {
                const name = data.sk_active[i];
                this.addSk_active(name)
            }
        }
        // 被动技能reload
        if (data.sk_auto) {
            for (let i = 0; i < data.sk_auto.length; i++) {
                const element = data.sk_auto[i];
                this.addSk_auto(new SKILL(element));
            }
        }
        this.updateAtt();
    }
    updateAtt() {
        if (!this._needUpdate) {
            return;
        }
        this._needUpdate = false;
        // 最终属性=
        // 角色基础属性 + 血统属性 * 角色等级
        // 特殊处理:护盾
        let leve = this.leve.getVal();
        this.hp.setMax(this.hp.getVal() + this.inherit.get_att(_att_key.生命值) * leve)
        this.hp_res.setVal(this.hp_res.getVal() + this.inherit.get_att(_att_key.生命恢复) * leve)
        this.mp.setMax(this.mp.getVal() + this.inherit.get_att(_att_key.魔法值) * leve)
        this.mp_res.setVal(this.mp_res.getVal() + this.inherit.get_att(_att_key.魔法恢复) * leve)
        this.dong_hp.setVal(this.dong_hp.getVal() + this.inherit.get_att(_att_key.生命护盾) * leve)
        this.dong_mp.setVal(this.dong_mp.getVal() + this.inherit.get_att(_att_key.魔法护盾) * leve)
        this.dong_phy.setVal(this.dong_phy.getVal() + this.inherit.get_att(_att_key.物理护盾) * leve)
        
        let base = this.attList;
        let out: att_val[] = [];
        for (let i = 0; i < base.length; i++) {
            const element = base[i];
            let val = element.getVal() + this.inherit.get_att(element.key)
            out.push(new att_val({ key: element.key, val: val }))
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
    active(){
        this.refAtt();
    }
    /**
     * 弃用
     */
    pushSkill(data: string) {
        this.addSk_active(data);

    }
    private addSk_auto(data: SKILL) {
        this.sk_auto.push(data);
    }
    addSk_active(data: any) {
        this.sk_active.push(new SKILL(data));
    }
    /**
     * 移除自身技能
     * @param idx 
     */
    rm_skill(idx:number) {
        if (idx < 0 || idx >= this.sk_active.length) {
            return;
        }
        this.sk_active.splice(idx, 1);
    }
    /**
     * 
     * @returns 获取所有技能
     */
    get_skill_all() {
        let allSkill: SKILL[] = [];
        allSkill = allSkill.concat(this.sk_active);
        allSkill = allSkill.concat(this.inherit.sk_active);
        return allSkill;
    }
    /**此单位战斗回合开始 */
    battle_round_begins(bt: battle) {
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
        let sk = availableSkills[common.random(0, availableSkills.length - 1)];
        // 2.技能释放 - 目标选择技能决定
        sk.use(this, bt);
    }
    battle_round_end(bt: battle) {
        this._buff_source.forEach((val, key) => {
            if (val.size == 0) {
                this._buff_source.delete(key);
            } else {
                val.forEach((item, key) => {
                    item.round -= 1;
                    if (item.round <= 0) {
                        val.delete(key);
                    }
                })
            }
        })
    }
    is_die() {
        let v = this.hp.getVal();
        return v <= 0
    }
    get_att(key: _att_key | string) {
        this.updateAtt();
        switch (key) {
            case _att_key.战斗力:
                return this.fight;
            case _att_key.等级:
                return this.leve;
            case _att_key.生命值:
                return this.hp;
            case _att_key.生命恢复:
                return this.hp_res;
            case _att_key.魔法值:
                return this.mp;
            case _att_key.魔法恢复:
                return this.mp_res;
            case _att_key.经验值:
                return this.exp;
            case _att_key.生命护盾:
                return this.dong_hp;
            case _att_key.魔法护盾:
                return this.dong_mp;
            case _att_key.物理护盾:
                return this.dong_phy;
            default:
                break;
        }
        let idx = this._outAtt.findIndex((item, idx) => {
            return (item.key == key || item.name == key)
        })
        if (idx == -1) {
            return undefined;
        }
        return this._outAtt[idx]
    }
    // 受到伤害
    damage(val: number, bt?: battle) {
        let v = this.hp.getVal();
        v -= val;
        this.hp.setVal(v);

        if (bt) {
            bt.log_data('承伤', this._group, this.name, val)
        }
    }
    resHp(val: number, bt?: battle) {
        let v = this.hp.getVal();
        v += val;
        let max = this.hp.getMax();
        if (v > max) {
            v = max;
        }
        this.hp.setVal(v);
        if (bt) {
            bt.log_data('治疗', this._group, this.name, val)
        }

    }
}