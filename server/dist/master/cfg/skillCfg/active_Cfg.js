"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shareFace_1 = require("../../../shared/shareFace");
const FACE_SKILL_1 = require("../../lib/face/FACE_SKILL");
let cfg = [];
cfg.push({
    name: '普通攻击',
    type: FACE_SKILL_1.SKILL_type.主动技能,
    target: FACE_SKILL_1.SKILL_target.敌人,
    desc: `对单个敌人造成(${shareFace_1._att_key.物理攻击}*1.5+测试力)物理伤害`,
    cd: 1,
    rang_type: FACE_SKILL_1.SKILL_rang.单体伤害,
    rang_num: 1,
    effects: [{
            tag: [FACE_SKILL_1.SKILL_eff_path.动作, FACE_SKILL_1.SKILL_eff_type.伤害类, FACE_SKILL_1.SKILL_eff_type_伤害类.物理伤害],
            data: {
                // 数值
                val_str: `${shareFace_1._att_key.物理攻击}*0.8+测试力`
            }
        }]
});
cfg.push({
    name: '大招',
    type: FACE_SKILL_1.SKILL_type.主动技能,
    target: FACE_SKILL_1.SKILL_target.敌人,
    desc: `对5个敌人造成(攻击力*2+测试力)物理伤害,并持续2回合+30%概率暴击`,
    cd: 5,
    rang_type: FACE_SKILL_1.SKILL_rang.范围伤害,
    rang_num: 5,
    effects: [
        {
            tag: [FACE_SKILL_1.SKILL_eff_path.buff, FACE_SKILL_1.SKILL_eff_type.增益类, FACE_SKILL_1.SKILL_eff_type_增益类.附加暴击],
            target: FACE_SKILL_1.SKILL_target.自己,
            data: {
                //buff name
                name: '残暴',
                // 持续回合
                round: 2,
                // 数值
                val_str: `30`
            }
        },
        {
            tag: [FACE_SKILL_1.SKILL_eff_path.动作, FACE_SKILL_1.SKILL_eff_type.伤害类, FACE_SKILL_1.SKILL_eff_type_伤害类.物理伤害],
            target: FACE_SKILL_1.SKILL_target.敌人,
            data: {
                // 数值
                val_str: `${shareFace_1._att_key.物理攻击}*0.5+测试力`
            }
        }
    ]
});
let cfg_active = new Map();
for (let i = 0; i < cfg.length; i++) {
    const element = cfg[i];
    if (cfg_active.has(element.name)) {
        console.error(`[技能重复注册]${element.name}`);
    }
    cfg_active.set(element.name, element);
}
exports.default = cfg_active;