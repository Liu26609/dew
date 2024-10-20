"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SKILL = void 0;
const active_Cfg_1 = __importDefault(require("../../cfg/skillCfg/active_Cfg"));
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
        this.effects = [];
        /**
         * 技能目标
         */
        this.target = FACE_SKILL_1.SKILL_target.敌人;
        // 范围类型
        this.rang_type = FACE_SKILL_1.SKILL_rang.单体伤害;
        // 范围数量
        this.rang_num = 1;
        /**
         * tag
         * data
         */
        this._log = [];
        this.data = {};
        if (data.data) {
            this.data = data.data;
        }
        let name = '';
        if (typeof (data) == 'string') {
            name = data;
            this.data.rename = name;
        }
        else {
            name = data.name;
        }
        const temp_res = active_Cfg_1.default.get(name);
        if (!temp_res) {
            console.error(`技能不存在`, name);
            debugger;
        }
        const temp = JSON.parse(JSON.stringify(temp_res));
        this.type = temp.type;
        this.name = temp.name;
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
                const effect = word_1.default.get_effectTemp(element.tag, element.target, element.data);
                if (effect) {
                    this.effects.push(effect);
                }
            }
        }
        else {
            console.error('!!!技能没有效果');
        }
    }
    get_name() {
        if (this.data && this.data.rename) {
            return this.data.rename;
        }
        return this.name;
    }
    save() {
        return { name: this.name, data: this.data };
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
        this.clearLog();
        let tag_list = this.get_target_rang(use, bt);
        let forCont = this.rang_num > 1 ? this.rang_num : tag_list.length;
        let _tags = [];
        for (let i = 0; i < tag_list.length; i++) {
            let _tag = tag_list[i];
            if (!_tag) {
                console.error('!!!技能目标不存在');
                continue;
            }
            _tags.push(_tag);
        }
        // 遍历effects
        for (let i = 0; i < this.effects.length; i++) {
            const element = this.effects[i];
            element.active(this, use, _tags, forCont, bt);
        }
        if (this._log.length > 0) {
            bt.log(use.get_group(), use.name, this.get_name(), this._log);
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
