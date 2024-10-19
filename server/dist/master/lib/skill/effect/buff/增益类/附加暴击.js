"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FACE_BODY_1 = require("../../../../face/FACE_BODY");
const effect_base_1 = require("../../effect_base");
class e extends effect_base_1.effect {
    //{
    //     // 数值
    //     val_str: `攻击力*1.5+防御力`
    // }
    constructor(keys, script, data) {
        super(keys, script, data);
    }
    active(sk, use, tag, cont = 1) {
        let effList = this.get_target(use, tag);
        for (let index = 0; index < effList.length; index++) {
            const e = effList[index];
            this.add_buff(FACE_BODY_1._att_key.物理暴击率, use, e, this.get_val(use));
        }
    }
}
exports.default = e;
