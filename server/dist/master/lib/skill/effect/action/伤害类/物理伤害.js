"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shareFace_1 = require("../../../../../../shared/shareFace");
const common_1 = __importDefault(require("../../../../common"));
const effect_base_1 = require("../../effect_base");
class e extends effect_base_1.effect {
    //{
    //     // 数值
    //     val_str: `攻击力*1.5+防御力`
    // }
    constructor(keys, script, data) {
        super(keys, script, data);
    }
    active(sk, use, tags, cont = 1, bt) {
        // console.log('执行脚本',this.script)
        for (let index = 0; index < tags.length; index++) {
            const tag = tags[index];
            try {
                if (tag.is_die()) {
                    return;
                }
            }
            catch (e) {
                debugger;
            }
            let val = this.get_val(use);
            if (val <= 0) {
                sk.log(this.tag, 0);
                return;
            }
            // 拿到tag防御
            let def_val = this.get_attVal(shareFace_1._att_key.物理防御, tag);
            let baoji = this.get_attVal(shareFace_1._att_key.物理暴击率, use);
            if (common_1.default.random(0, 100) < baoji) {
                val = val * 2;
            }
            // 计算伤害
            let damage = val - def_val;
            if (damage <= 0) {
                damage = 1;
            }
            bt.log_data('伤害', use.get_group(), use.name, damage);
            tag.damage(damage, bt);
            sk.log(this.tag, damage);
            if (tag.is_die()) {
                console.log(`${use.name}使用${sk.name}击杀了${tag.name}`, '');
                bt.log_kill(use, tag);
            }
        }
    }
}
exports.default = e;
