"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.effect = void 0;
const FACE_SKILL_1 = require("../../face/FACE_SKILL");
class effect {
    constructor(tag, target, data) {
        this.id = 0;
        this.target = FACE_SKILL_1.SKILL_target.自己;
        this.target = target;
        this.tag = tag;
        this.data = data || {};
    }
    save() {
        return {
            id: this.id,
            data: this.data,
        };
    }
    get_key() {
        return this.tag.join('_');
    }
    get_attVal(key, tag) {
        let me = tag.get_att(key);
        let bf = tag.get_buffVal(key);
        if (me) {
            return me.getVal() + bf;
        }
        return bf;
    }
    get_target(use, tags) {
        let list = [];
        switch (this.target) {
            case FACE_SKILL_1.SKILL_target.自己:
                list = [use];
                break;
            case FACE_SKILL_1.SKILL_target.敌人:
                list = tags;
                break;
            default:
                break;
        }
        return list;
    }
    add_buff(key, use, tag, val) {
        tag.add_buff(key, this.data.name, this.data.round, val, use);
    }
    /**
     * 效果生效
     */
    active(sk, use, tag, cont = 1, bt) {
    }
    get_val(use) {
        try {
            let val_str = this.data.val_str;
            // 将val_str按计算符号分割
            let val_arr = val_str.split(/(\+|\-|\*|\/)/);
            for (let i = 0; i < val_arr.length; i++) {
                const element = val_arr[i];
                // 如果element是数字，则跳过
                if (!isNaN(element)) {
                    continue;
                }
                // 如果element是计算符号，则跳过/(\+|\-|\*|\/)/
                if (/(\+|\-|\*|\/)/.test(element)) {
                    continue;
                }
                let line = use.get_att(element);
                //    如果line是undefined，则直接替换为0
                if (!line) {
                    val_str = val_str.replace(element, '0');
                    continue;
                }
                let val = line.getVal();
                val_str = val_str.replace(element, val.toString());
            }
            let calculateVal = new Function('val_str', `return ${val_str}`);
            let val = calculateVal(val_str);
            return val;
        }
        catch (error) {
            debugger;
        }
    }
    /**
     * 对目标造成伤害
     */
    damage(use, tag, damage, sk, bt) {
        let is_die = tag.is_die();
        if (is_die) {
            return;
        }
        tag.damage(use, damage, bt);
        if (sk.get_realName() == '普通攻击') {
            tag.trigger(FACE_SKILL_1.SKILL_eff_condition.受到普通攻击时, use, bt);
        }
        sk.log(this.tag, damage);
        if (tag.is_die()) {
            console.log(`${use.name}使用${sk.name}击杀了${tag.name}`, '');
            bt.log_kill(use, tag);
        }
    }
}
exports.effect = effect;
