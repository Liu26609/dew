import exp from "constants";
import { _att_key, SKILL_type } from "../../../shared/protocols/shareFace";
import cfg_active from "../../cfg/skillCfg/active_Cfg";
import cfg_auto from "../../cfg/skillCfg/auto_Cfg";
import { battle } from "../battle/battle";
import common from "../common";
import { SKILL_eff_condition, SKILL_rang, SKILL_target } from "../face/FACE_SKILL";
import { body_base } from "../unity/base/body_base";
import { unity } from "../unity/unity";
import word from "../word";
import { effect } from "./effect/effect_base";
import { body_bar } from "../unity/base/body_com";

export class SKILL {
    name: string;
    id: string = common.v4()
    type: SKILL_type.主动技能
    desc: string = '技能描述'
    /**
     * cd 为-1时表示无cd
     */
    cd: number = -1
    private _cd: number = 1;
    /**
     * 技能效果
     * 主动技能效果
     */
    effects: effect[] = []
    /**
     * 技能目标
     */
    target: SKILL_target = SKILL_target.敌人
    // 范围类型
    rang_type: SKILL_rang = SKILL_rang.单体伤害
    /**
     * 技能范围数量
     */
    rang_num: number = 1
    /**
     * tag
     * data
     */
    private _log: { key: string, val: any }[] = [];
    /**
     * 技能等级
     */
    leve:number = 1;
    exp:body_bar = new body_bar({ key: _att_key.经验值, max: 100, now: 0 })
    data: any = {};
    trigger?: { condition: SKILL_eff_condition, effect: effect[] } = undefined;
    constructor(data: any) {
        if (data.data) {
            this.data = data.data;
        }

        this.type = data.type;
        this.name = data.name;
        this.leve = data.leve || 1;
        if(data.exp){
            this.exp = new body_bar(data.exp)
        }


        const temp_res = this.type == SKILL_type.主动技能 ? cfg_active.get(this.name) : cfg_auto.get(this.name);
        if (!temp_res) {
            console.error(`技能不存在`, this.name)
            debugger;
        }
        const temp = JSON.parse(JSON.stringify(temp_res));

     
        this.id = temp.id || common.v4();
        this.desc = temp.desc || '技能暂未描述';
        this.target = temp.target || SKILL_target.敌人;
        this.rang_type = temp.rang_type || SKILL_rang.单体伤害;
        this.rang_num = temp.rang_num || 1;
        this.cd = temp.cd || -1;
        this._cd = this.cd;
        if (temp.effects) {
            for (let i = 0; i < temp.effects.length; i++) {
                const element = temp.effects[i];
                const effect = word.get_effectTemp(element);
                if (effect) {
                    this.effects.push(effect);
                }
            }
        } else {
            console.error('!!!技能没有效果')
        }
        if (temp.trigger) {
            this.trigger = { condition: temp.trigger.condition, effect: [] };
            for (let i = 0; i < temp.trigger.effect.length; i++) {
                const element = temp.trigger.effect[i];
                const effect = word.get_effectTemp(element);
                if (effect) {
                    this.trigger.effect.push(effect);
                }
            }
        }
    }
    /**
     * 增加技能经验
     * @param val 
     */
    add_exp(val:number){
        this.exp.now += val;
        if(this.exp.now >= this.exp.max){
            this.exp.now = 0;
            this.leve += 1;
        }
    }
    set_rename(name: string) {
        this.data.rename = name;
    }
    /**
     * 读取真实名称
     */
    get_realName() {
        return this.name;
    }

    get_name() {
        if (this.data && this.data.rename) {
            return this.data.rename
        }
        return this.name
    }
    save() {
        return {
            leve:this.leve,
            name: this.name,
            type: this.type,
            data: this.data,
        }
    }
    clearLog() {
        this._log = [];
    }
    log(_effTags: string[], val: string | number) {
        // 拼接_effTags数组为字符串
        let effTags = _effTags.join('_');
        // 查找_log中是否存在tpl
        let idx = this._log.findIndex((item) => {
            return item.key == effTags;
        });
        if (idx == -1) {
            this._log.push({ key: effTags, val: val });
        } else {
            if (typeof this._log[idx].val == 'number' && typeof val == 'number') {
                this._log[idx].val += val;
            } else {
                this._log.push({ key: effTags, val: val });
            }
        }
    }
    next_round() {
        if (this.cd > 0) {
            this.cd -= 1;
        }
        return this.cd;
    }
    /**
     * 是否能够释放技能
     */
    can_use(bt: battle) {

    }
    use(use: body_base, bt: battle) {
        this.cd = this._cd;
        let tag_list = this.get_target_rang(use, bt);
        // let forCont = this.rang_num > 1 ? this.rang_num : tag_list.length;
        this.runEffect(use, tag_list, this.effects, bt)
        if (this._log.length > 0) {
            bt.log(use.get_group(), use.name, this.get_name(), this._log)
        }
    }

    private runEffect(use: body_base, tags: body_base[], effects: effect[], bt: battle) {
        this.clearLog();
        let _tags: body_base[] = [];
        for (let i = 0; i < tags.length; i++) {
            let _tag = tags[i];
            if (!_tag) {
                console.error('!!!技能目标不存在')
                continue;
            }
            _tags.push(_tag);

        }
        // 遍历effects
        for (let i = 0; i < effects.length; i++) {
            const element = effects[i];
            element.active(this, use, _tags, 0, bt)
        }
        if (this._log.length > 0) {
            bt.log(use.get_group(), use.name, this.get_name(), this._log)
        }
    }
    trigger_tick(condition: SKILL_eff_condition, self: body_base, tag: body_base, bt: battle) {
        if (!this.trigger) {
            return;
        }
        if (this.trigger.condition != condition) {
            return;
        }
        console.log(`[被动触发]${this.name}`)
        // 如果 目标是 敌人  并且 范围 为1 则 目标为tag
        if (this.target == SKILL_target.敌人 && this.rang_num == 1) {
            this.runEffect(self, [tag], this.trigger.effect, bt)
        }
    }
    /**
     * 获取目标群体
     */
    private get_target(use: body_base, bt: battle) {
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
    private get_target_rang(use: body_base, bt: battle) {
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
            case SKILL_rang.范围伤害:
                {
                    const tags = this.get_target(use, bt);
                    // 过滤掉死亡的
                    const lifes = tags.filter(item => item.is_die() == false)
                    const randomTargets: body_base[] = [];
                    for (let i = 0; i < this.rang_num; i++) {
                        if (lifes.length === 0) break;
                        const randomIndex = Math.floor(Math.random() * lifes.length);
                        randomTargets.push(lifes[randomIndex]);
                        lifes.splice(randomIndex, 1); // Remove the selected target to avoid duplicates
                    }
                    return randomTargets;
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
