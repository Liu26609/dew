import { battle } from "../../battle/battle";
import common from "../../common";
import { _att_key, battle_group } from "../../face/FACE_BODY";
import { SKILL_type } from "../../face/FACE_SKILL";
import { SKILL } from "../../skill/SKILL";
import word from "../../word";
import { att_line, att_val, body_bar } from "./body_com"

export class body_base {
    id: string = '';
    name: string = '未命名的单位';
    attList: (att_line | att_val | body_bar)[] = []
    private _group: battle_group = battle_group.主场;
    sk_auto: SKILL[] = [];
    sk_active: SKILL[] = [];

    constructor() {

    }
    set_group(g: battle_group) {
        this._group = g;
    }
    get_group(){
        return this._group;
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
        this.name = data.name;
        this.id = data.id || common.v4();
        for (let index = 0; index < data.attList.length; index++) {
            const element = data.attList[index];
            const TypeClass = typeMap[element.t];
            if (!TypeClass) {
                console.error('TypeClass 不存在', element.t)
            }
            this.attList.push(new TypeClass(element))
        }
        // 主动技能reload
        if (data.sk_active) {
            for (let i = 0; i < data.sk_active.length; i++) {
                const element = data.sk_active[i];
                this.addSk_active(new SKILL(element))
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

    pushSkill(data: any) {
        let sk = new SKILL(data)
        if (data.type == SKILL_type.主动技能) {
            this.addSk_active(sk);
        } else {
            this.addSk_auto(sk);
        }
    }
    private addSk_auto(data: SKILL) {
        this.sk_auto.push(data);
    }
    private addSk_active(data: SKILL) {
        this.sk_active.push(data);
    }
    /**此单位战斗回合开始 */
    battle_round_begins(bt:battle) {
        /**
         * 1.技能选择 - ai训练
         * 2.目标选择 - 技能决定
         * 3.技能释放
         */
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
    damage(val:number){
        let att = this.get_att(_att_key.生命)
        if (att) {
            let v = att.getVal();
            v -= val;
            att.setVal(v);
        } else {
            console.error('Attribute not found:', _att_key.生命);
        }
    }
}