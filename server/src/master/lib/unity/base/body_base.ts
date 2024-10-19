import { WsClient } from "tsrpc";
import { ServiceType } from "../../../../shared/master/serviceProto";
import { battle } from "../../battle/battle";
import common from "../../common";
import { _att_key, battle_group } from "../../face/FACE_BODY";
import { SKILL_type } from "../../face/FACE_SKILL";
import { SKILL } from "../../skill/SKILL";
import { att_line, att_val, body_bar } from "./body_com"
import bags from "../../bag/bags";
import { Item_Type, prop_item } from "../../../../shared/shareFace";
export class body_base {
    id: string = '';
    name: string = '未命名的单位';
    attList: (att_line | att_val | body_bar)[] = []
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
    constructor() {

    }
    set_battleLs(ls: any) {
        this._battleLs = ls;
    }
    get_battleLs() {
        return this._battleLs;
    }
    set_battle(b: battle | undefined) {
        this._battle = b;
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
    wallet_add(key:string,val:number){
        if(!this.wallet[key]){
            this.wallet[key] = 0;
        }
        this.wallet[key] += val;
    }
    private _addItem_道具(data: any) {
        switch (data.name) {
            case '金币':
                this.wallet_add(data.name,data.cont)
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
        let att_exp = this.get_att(_att_key.经验值) as body_bar;
        if (!att_exp) {
            this.attList.push(new body_bar({ name: 'EXP', key: _att_key.经验值, max: 100, now: 0 }))
            att_exp = this.get_att(_att_key.经验值) as body_bar;
        }
        let v = att_exp.getVal();
        let max = att_exp.getMax();
        while (v + exp >= max) {
            exp -= (max - v);
            let leve = this.get_att(_att_key.等级) as att_val;
            if (!leve) {
                this.attList.push(new att_val({ name: '等级', key: _att_key.等级, val: 1 }))
                leve = this.get_att(_att_key.等级) as att_val;
            }
            if (leve) {
                leve.setVal(leve.getVal() + 1);
                att_exp.setMax(att_exp.getMax() + leve.getVal() * 100)
                att_exp.setVal(0)
            }
            v = 0;
        }
        att_exp.setVal(v);
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
        // 背包
        if(data.bag){
            this.bag.items =data.bag.items;
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
    /**此单位战斗回合开始 */
    battle_round_begins(bt: battle) {
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
        let att = this.get_att(_att_key.生命)
        if (!att) {
            console.error('Attribute not found:', _att_key.生命);
            return true;
        }
        let v = att.getVal();
        return v <= 0
    }
    get_att(key: _att_key | string) {
        let idx = this.attList.findIndex((item, idx) => {
            return (item.key == key || item.name == key)
        })
        if (idx == -1) {
            return undefined;
        }
        return this.attList[idx]
    }
    // 受到伤害
    damage(val: number, bt?: battle) {
        let att = this.get_att(_att_key.生命)
        if (att) {
            let v = att.getVal();
            v -= val;
            att.setVal(v);
        } else {
            console.error('Attribute not found:', _att_key.生命);
        }
        if (bt) {
            bt.log_data('承伤', this._group, this.name, val)
        }
    }
    resHp(val: number, bt?: battle) {
        let att = this.get_att(_att_key.生命) as body_bar;
        if (att) {
            let v = att.getVal();
            v += val;
            let max = att.getMax();
            if (v > max) {
                v = max;
            }
            att.setVal(v);
        } else {
            console.error('Attribute not found:', _att_key.生命);
        }
        if (bt) {
            bt.log_data('治疗', this._group, this.name, val)
        }

    }
}