import { _att_key, SKILL_type } from "../../../shared/protocols/shareFace";
import { SKILL_target, SKILL_rang, SKILL_eff_path, SKILL_eff_type, SKILL_eff_type_伤害类, SKILL_eff_type_增益类, SKILL_eff_condition } from "../../lib/face/FACE_SKILL"
/**
 * 技能配置
 * 效果组成
 */

// TODO 内置CD 1毫秒 防止无限触发

// 技能来源  使用者  目标  战场
// 触发来源  自身  触发者  战场
let cfg: any = []
cfg.push({
    name: '荆棘之甲',
    type: SKILL_type.被动技能,
    target: SKILL_target.敌人,
    desc: `受到普通攻击时将对触发者造成(20%受到的伤害)魔法伤害`,
    cd: 1,
    // 提供被动效果
    trigger: {
        condition: SKILL_eff_condition.受到普通攻击时,
        effect: [{
            tag: [SKILL_eff_path.动作, SKILL_eff_type.伤害类, SKILL_eff_type_伤害类.魔法伤害],
            data: {
                // 数值
                val_str: `受击伤害*0.2`
            }
        }]
    },
    rang_type: SKILL_rang.单体伤害,
    rang_num: 1,
    effects: []
})


let auto_Cfg = new Map();
for (let i = 0; i < cfg.length; i++) {
    const element = cfg[i];
    if (auto_Cfg.has(element.name)) {
        console.error(`[auto_Cfg技能重复注册]${element.name}`)
    }
    auto_Cfg.set(element.name, element)
}
export default auto_Cfg