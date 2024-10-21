import { SKILL_type } from "../../../shared/shareFace";
import cfg_active from "../../cfg/skillCfg/active_Cfg";
import { battle } from "../battle/battle";
import common from "../common";
import { SKILL_rang, SKILL_target } from "../face/FACE_SKILL";
import { body_base } from "../unity/base/body_base";
import { unity } from "../unity/unity";
import word from "../word";
import { effect } from "./effect/effect_base";

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
    private _log: { key: string, val: any }[] = [];
    data: any = {};
    constructor(data: any) {
        if (data.data) {
            this.data = data.data;
        }
        let name = '';
        if (typeof (data) == 'string') {
            name = data;
            this.data.rename = name;
        } else {
            name = data.name
        }
        const temp_res = cfg_active.get(name)
        if(!temp_res){
            console.error(`技能不存在`,name)
            debugger;
        }
        const temp = JSON.parse(JSON.stringify(temp_res));
        this.type = temp.type;
        this.name = temp.name;
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
                const effect = word.get_effectTemp(element.tag, element.target, element.data);
                if (effect) {
                    this.effects.push(effect);
                }
            }
        } else {
            console.error('!!!技能没有效果')
        }
    }
    set_rename(name: string) {
        this.data.rename = name;
    }
    get_name(){
        if(this.data && this.data.rename){
            return this.data.rename
        }
        return this.name
    }
    save() {
        return { name: this.name, data: this.data }
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
        this.clearLog();
        let tag_list = this.get_target_rang(use, bt);
        let forCont = this.rang_num > 1 ? this.rang_num : tag_list.length;


        let _tags: body_base[] = [];
        for (let i = 0; i < tag_list.length; i++) {
            let _tag = tag_list[i];
            if (!_tag) {
                console.error('!!!技能目标不存在')
                continue;
            }
            _tags.push(_tag);

        }
        // 遍历effects
        for (let i = 0; i < this.effects.length; i++) {
            const element = this.effects[i];
            element.active(this, use, _tags, forCont, bt)
        }

        if (this._log.length > 0) {
            bt.log(use.get_group(), use.name, this.get_name(), this._log)
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
