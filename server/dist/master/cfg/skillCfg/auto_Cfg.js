"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shareFace_1 = require("../../../shared/protocols/shareFace");
const FACE_SKILL_1 = require("../../lib/face/FACE_SKILL");
/**
 * 技能配置
 * 效果组成
 */
// TODO 内置CD 1毫秒 防止无限触发
// 效果模板编辑页面
// 技能主体编辑页面  effect[效果模板]
let cfg = [];
cfg.push({
    name: '荆棘之甲',
    type: shareFace_1.SKILL_type.被动技能,
    target: FACE_SKILL_1.SKILL_target.敌人,
    desc: `在被一次攻击命中后，对攻击者造成15（+15%护甲）魔法伤害，并且如果目标是英雄，还会施加持续3秒的40%重伤效果`,
    cd: 1,
    // 提供被动效果
    trigger: {
        condition: FACE_SKILL_1.SKILL_eff_condition.受到普通攻击时,
        effect: [{ id: 3 }]
    },
    rang_type: FACE_SKILL_1.SKILL_rang.单体伤害,
    rang_num: 1,
    effects: []
});
// 使用XX技能时将获得1个灵魂
// 每100个灵魂将提升10%  xx技能的伤害
let cfg_auto = new Map();
for (let i = 0; i < cfg.length; i++) {
    const element = cfg[i];
    if (cfg_auto.has(element.name)) {
        console.error(`[cfg_auto技能重复注册]${element.name}`);
    }
    cfg_auto.set(element.name, element);
}
exports.default = cfg_auto;
