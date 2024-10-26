"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SKILL = void 0;
const shareFace_1 = require("../../../shared/protocols/shareFace");
const active_Cfg_1 = __importDefault(require("../../cfg/skillCfg/active_Cfg"));
const auto_Cfg_1 = __importDefault(require("../../cfg/skillCfg/auto_Cfg"));
const common_1 = __importDefault(require("../common"));
const FACE_SKILL_1 = require("../face/FACE_SKILL");
const word_1 = __importDefault(require("../word"));
class SKILL {
    constructor(data) {
        this.id = common_1.default.v4();
        this.desc = '技能描述';
        /**
         * cd 为-1时表示无cd
         */
        this.cd = -1;
        this._cd = 1;
        /**
         * 技能效果
         * 主动技能效果
         */
        this.effects = [];
        /**
         * 技能目标
         */
        this.target = FACE_SKILL_1.SKILL_target.敌人;
        // 范围类型
        this.rang_type = FACE_SKILL_1.SKILL_rang.单体伤害;
        /**
         * 技能范围数量
         */
        this.rang_num = 1;
        /**
         * tag
         * data
         */
        this._log = [];
        this.data = {};
        this.trigger = undefined;
        if (data.data) {
            this.data = data.data;
        }
        this.type = data.type;
        this.name = data.name;
        const temp_res = this.type == shareFace_1.SKILL_type.主动技能 ? active_Cfg_1.default.get(this.name) : auto_Cfg_1.default.get(this.name);
        if (!temp_res) {
            console.error(`技能不存在`, this.name);
            debugger;
        }
        const temp = JSON.parse(JSON.stringify(temp_res));
        this.id = temp.id || common_1.default.v4();
        this.desc = temp.desc || '技能暂未描述';
        this.target = temp.target || FACE_SKILL_1.SKILL_target.敌人;
        this.rang_type = temp.rang_type || FACE_SKILL_1.SKILL_rang.单体伤害;
        this.rang_num = temp.rang_num || 1;
        this.cd = temp.cd || -1;
        this._cd = this.cd;
        if (temp.effects) {
            for (let i = 0; i < temp.effects.length; i++) {
                const element = temp.effects[i];
                const effect = word_1.default.get_effectTemp(element);
                if (effect) {
                    this.effects.push(effect);
                }
            }
        }
        else {
            console.error('!!!技能没有效果');
        }
        if (temp.trigger) {
            this.trigger = { condition: temp.trigger.condition, effect: [] };
            for (let i = 0; i < temp.trigger.effect.length; i++) {
                const element = temp.trigger.effect[i];
                const effect = word_1.default.get_effectTemp(element);
                if (effect) {
                    this.trigger.effect.push(effect);
                }
            }
        }
    }
    set_rename(name) {
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
            return this.data.rename;
        }
        return this.name;
    }
    save() {
        return {
            name: this.name,
            type: this.type,
            data: this.data,
        };
    }
    clearLog() {
        this._log = [];
    }
    log(_effTags, val) {
        // 拼接_effTags数组为字符串
        let effTags = _effTags.join('_');
        // 查找_log中是否存在tpl
        let idx = this._log.findIndex((item) => {
            return item.key == effTags;
        });
        if (idx == -1) {
            this._log.push({ key: effTags, val: val });
        }
        else {
            if (typeof this._log[idx].val == 'number' && typeof val == 'number') {
                this._log[idx].val += val;
            }
            else {
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
    can_use(bt) {
    }
    use(use, bt) {
        this.cd = this._cd;
        let tag_list = this.get_target_rang(use, bt);
        // let forCont = this.rang_num > 1 ? this.rang_num : tag_list.length;
        this.runEffect(use, tag_list, this.effects, bt);
        if (this._log.length > 0) {
            bt.log(use.get_group(), use.name, this.get_name(), this._log);
        }
    }
    runEffect(use, tags, effects, bt) {
        this.clearLog();
        let _tags = [];
        for (let i = 0; i < tags.length; i++) {
            let _tag = tags[i];
            if (!_tag) {
                console.error('!!!技能目标不存在');
                continue;
            }
            _tags.push(_tag);
        }
        // 遍历effects
        for (let i = 0; i < effects.length; i++) {
            const element = effects[i];
            element.active(this, use, _tags, 0, bt);
        }
        if (this._log.length > 0) {
            bt.log(use.get_group(), use.name, this.get_name(), this._log);
        }
    }
    trigger_tick(condition, self, tag, bt) {
        if (!this.trigger) {
            return;
        }
        if (this.trigger.condition != condition) {
            return;
        }
        console.log(`[被动触发]${this.name}`);
        // 如果 目标是 敌人  并且 范围 为1 则 目标为tag
        if (this.target == FACE_SKILL_1.SKILL_target.敌人 && this.rang_num == 1) {
            this.runEffect(self, [tag], this.trigger.effect, bt);
        }
    }
    /**
     * 获取目标群体
     */
    get_target(use, bt) {
        switch (this.target) {
            case FACE_SKILL_1.SKILL_target.敌人:
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
    get_target_rang(use, bt) {
        switch (this.rang_type) {
            case FACE_SKILL_1.SKILL_rang.单体伤害:
                {
                    const tags = this.get_target(use, bt);
                    // 过滤掉死亡的
                    const lifes = tags.filter(item => item.is_die() == false);
                    // 随机
                    const random = Math.floor(Math.random() * lifes.length);
                    return [lifes[random]];
                }
            case FACE_SKILL_1.SKILL_rang.范围伤害:
                {
                    const tags = this.get_target(use, bt);
                    // 过滤掉死亡的
                    const lifes = tags.filter(item => item.is_die() == false);
                    const randomTargets = [];
                    for (let i = 0; i < this.rang_num; i++) {
                        if (lifes.length === 0)
                            break;
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
                    const lifes = tags.filter(item => item.is_die() == false);
                    // 随机
                    const random = Math.floor(Math.random() * lifes.length);
                    return [lifes[random]];
                }
        }
    }
}
exports.SKILL = SKILL;
