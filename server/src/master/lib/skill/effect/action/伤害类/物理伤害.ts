import { _att_key } from "../../../../../../shared/protocols/shareFace";
import { battle } from "../../../../battle/battle";
import common from "../../../../common";
import { SKILL_rang, SKILL_eff_type, SKILL_eff_type_伤害类 } from "../../../../face/FACE_SKILL";
import { unity } from "../../../../unity/unity";
import { SKILL } from "../../../SKILL";
import { effect } from "../../effect_base";
class e extends effect {
    //{
    //     // 数值
    //     val_str: `攻击力*1.5+防御力`
    // }
    constructor(keys, script, data) {
        super(keys, script, data)

    }

    active(sk: SKILL, use: unity, tags: unity[], cont: number = 1, bt: battle) {
        // console.log('执行脚本',this.script)
        for (let index = 0; index < tags.length; index++) {
            const tag = tags[index];
            try {
                if (tag.is_die()) {
                    return;
                }
            } catch (e) {
                debugger
            }

            let val = this.get_val(use);
            if (val <= 0) {
                sk.log(this.tag, 0);
                return;
            }
            // 拿到tag防御
            let def_val = this.get_attVal(_att_key.物理防御, tag);

            let baoji = this.get_attVal(_att_key.物理暴击率, use);

            if (common.random(0, 100) < baoji) {
                val = val * 2;
            }

            // 计算伤害
            let damage = val - def_val;
            if (damage <= 0) {
                damage = 1;
            }
            // bt.log_data('伤害', use.get_group(), use.name, damage)
         
           this.damage(use, tag, damage,sk,bt)
            
        }

    }
}
export default e;