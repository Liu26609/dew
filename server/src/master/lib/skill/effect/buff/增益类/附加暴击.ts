import { _att_key } from "../../../../face/FACE_BODY";
import { body_base } from "../../../../unity/base/body_base";
import { SKILL } from "../../../SKILL";
import { effect } from "../../effect_base";
class e extends effect {
    //{
    //     // 数值
    //     val_str: `攻击力*1.5+防御力`
    // }
    constructor(keys,script, data) {
        super(keys,script, data)

    }

    active(sk:SKILL,use: body_base, tag: body_base[], cont: number = 1) {
        let effList = this.get_target(use,tag)
        
        for (let index = 0; index < effList.length; index++) {
            const e = effList[index];
            this.add_buff(_att_key.暴击率,use,e,this.get_val(use));
        }
    }
}
export default e;