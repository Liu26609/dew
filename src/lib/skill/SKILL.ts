import { battle_d } from "../battle/battle";
import common from "../common";
import { SKILL_rang, SKILL_target, SKILL_type } from "../face/FACE_SKILL";
import { unity } from "../unity/unity";
import word from "../word";
import { effect } from "./effect/effect_base";

export class SKILL {
    name: string;
    id: string = common.v4()
    type: SKILL_type.主动技能
    effects: effect[] = []
    /**
     * 技能目标
     */
    target: SKILL_target = SKILL_target.敌人
    // 范围类型
    rang_type: SKILL_rang = SKILL_rang.单体伤害
    // 范围数量
    rang_num: number = 1
    /**
     * tag
     * data
     */
    private _log: { tpl: string, val: any }[] = [];
    constructor(data: any) {
        this.type = data.type;
        this.name = data.name;
        this.id = data.id || common.v4();
        this.target = data.target || SKILL_target.敌人;
        this.rang_type = data.rang_type || SKILL_rang.单体伤害;
        this.rang_num = data.rang_num || 1;
        if (data.effects) {
            for (let i = 0; i < data.effects.length; i++) {
                const element = data.effects[i];
                this.effects.push(word.get_effectTemp(element.tag, element.data))
            }
        } else {
            console.error('!!!技能没有效果')
        }
    }
    clearLog() {
        this._log = [];
    }
    log(tpl: string, val: string | number) {
        // 查找_log中是否存在tpl
        let idx = this._log.findIndex((item, idx) => {
            return item.tpl == tpl
        })
        if (idx == -1) {
            this._log.push({ tpl: tpl, val: val })
        } else {
            if (typeof (this._log[idx].val) == 'number' && typeof (val) == 'number') {
                this._log[idx].val += val;
            } else {
                this._log.push({ tpl: tpl, val: val })
            }
        }
    }
    /**
     * 是否能够释放技能
     */
    can_use(bt: battle_d) {

    }
    use(use: unity, bt: battle_d) {
        this.clearLog();
        let tag_list = this.get_target_rang(use, bt);
        let forCont = this.rang_num > 1 ? this.rang_num : tag_list.length;

        for (let i = 0; i < tag_list.length; i++) {
            let _tag = tag_list[i];
            // 遍历effects
            for (let i = 0; i < this.effects.length; i++) {
                const element = this.effects[i];
                element.active(this, use, _tag, forCont)
            }
        }



        if (this._log.length > 0) {
            bt.log(`[${use.name}] 使用了 [${this.name}]。`)
            this._log.forEach(item => {
                let log = item.tpl.replace('$', item.val.toString());
                bt.log(log)
            })
        }
    }
    /**
     * 获取目标群体
     */
    private get_target(use: unity, bt: battle_d) {
        switch (this.target) {
            case SKILL_target.敌人:
                {
                    const tag = bt.get_absGroup(use.get_group());
                    return [...tag.values()];
                }
            default:
                const tag = bt.get_absGroup(use.get_group());
                return [...tag.values()];
        }
    }
    /**
     * 获取目标群体
     */
    private get_target_rang(use: unity, bt: battle_d) {
        switch (this.rang_type) {
            case SKILL_rang.单体伤害:
                {
                    const tags = this.get_target(use, bt);
                    // 过滤掉死亡的
                    const lifes = tags.filter(item => item.is_die() == false)
                    // 随机
                    const random = Math.floor(Math.random() * lifes.length);
                    return [lifes[random]]
                }
            default:
                {
                    const tags = this.get_target(use, bt);
                    // 过滤掉死亡的
                    const lifes = tags.filter(item => item.is_die() == false)
                    // 随机
                    const random = Math.floor(Math.random() * lifes.length);
                    return [lifes[random]]
                }
        }
    }
}
