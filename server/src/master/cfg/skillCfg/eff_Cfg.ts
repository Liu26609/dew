import { _att_key } from "../../../shared/protocols/shareFace"
import { SKILL_eff_path, SKILL_eff_type, SKILL_eff_type_伤害类, SKILL_eff_type_增益类, SKILL_target } from "../../lib/face/FACE_SKILL"

let cfg: any = []

cfg.push({
    id: 1,
    desc: '对目标造成物理攻击*0.8的伤害',
    tag: [SKILL_eff_path.动作, SKILL_eff_type.伤害类, SKILL_eff_type_伤害类.物理伤害],
    data: {
        // 数值
        val_str: `${_att_key.物理攻击}*0.8+测试力`
    }
})

cfg.push({
    id: 2,
    desc:"对自己附加持续2回合增加30%暴击率的【残暴】buff",
    tag: [SKILL_eff_path.buff, SKILL_eff_type.增益类, SKILL_eff_type_增益类.附加暴击],
    target: SKILL_target.自己,
    data: {
        //buff name
        name: '残暴',
        // 持续回合
        round: 2,
        // 数值
        val_str: `30`
    }
})
cfg.push({
    id: 3,
    desc:"对自己附加持续2回合增加30%暴击率的【残暴】buf",
    tag: [SKILL_eff_path.动作, SKILL_eff_type.伤害类, SKILL_eff_type_伤害类.物理伤害],
    data: {
        // 数值
        val_str: `15+0.15*${_att_key.物理防御}`
    }
})
let cfg_eff = new Map();
for (let i = 0; i < cfg.length; i++) {
    const element = cfg[i];
    if (cfg_eff.has(element.id)) {
        console.error(`[cfg_auto技能重复注册]${element.id}`)
    }
    cfg_eff.set(element.id, element)
}

export default cfg_eff;