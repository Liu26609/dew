import { _att_key, battle_group } from "../face/FACE_BODY";
import { SKILL_rang, SKILL_eff_type, SKILL_eff_type_伤害类, SKILL_type, SKILL_target } from "../face/FACE_SKILL";
import { body_bar, att_val } from "../unity/base/body_com";
import { unity } from "../unity/unity";
import { battle_d } from "./battle";
export class test_battle{
    constructor(){

    }
    create_unity(){
        let data:any = {};
        data.name = '测试单位';
        data.attList = [];
        data.attList.push(new body_bar({ name: '生命值', key: _att_key.生命, max: 100, now: 100 }))
        data.attList.push(new att_val({name:'攻击力',key:_att_key.物理攻击,val:10}))
        data.attList.push(new att_val({name:'防御力',key:_att_key.物理防御,val:10}))


        data.sk_active = [];
        data.sk_active.push({
            name:'测试技能',
            type:SKILL_type.主动技能,
            target:SKILL_target.敌人,
            rang_type:SKILL_rang.单体伤害,
            rang_num:1,
            effects:[{
                tag:[SKILL_eff_type.伤害类,SKILL_eff_type_伤害类.物理伤害],
                data:{
                    // 范围类型
                    rang_type:SKILL_rang.单体伤害,
                    // 范围数量
                    rang_num:1,
                    // 数值
                    val_str:`攻击力*1.5+测试力`
                }
            }]
        })


        return new unity(data)
    }
    attack(a,b){
        let bt = new battle_d();
        bt.join(battle_group.主场,a)
        bt.join(battle_group.客场,b)
        bt.start()
    }
}