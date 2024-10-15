import { battle } from "../../../battle/battle";
import { _att_key } from "../../../face/FACE_BODY";
import { SKILL_rang, SKILL_eff_type, SKILL_eff_type_伤害类 } from "../../../face/FACE_SKILL";
import { unity } from "../../../unity/unity";
import { SKILL } from "../../SKILL";
import { effect } from "../effect_base";
class e extends effect {
    //{
    //     // 数值
    //     val_str: `攻击力*1.5+防御力`
    // }
    constructor(keys, data) {
        super(keys, data)

    }

    active(sk:SKILL,use: unity, tag: unity, cont: number = 1) {
        try{
            if(tag.is_die()){
                return;
            }
        }catch(e){
            debugger
        }
   
        let val = this.get_val(use);
        
        // 拿到tag防御
        let def = tag.get_att(_att_key.物理防御);
        let def_val = 0;
        if(def){
            def_val = def.getVal();
        }
        // 计算伤害
        let damage = val - def_val;
        tag.damage(damage);
        sk.log(this.tag,damage)
        if(tag.is_die()){
            console.log(`${use.name}使用${sk.name}击杀了${tag.name}`,'')
        }
    }
}
export default e;