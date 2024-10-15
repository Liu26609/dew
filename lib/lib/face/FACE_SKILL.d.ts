export declare enum SKILL_type {
    主动技能 = 0,
    被动技能 = 1
}
export declare enum SKILL_target {
    敌人 = 0,
    敌人_死亡 = 1,
    敌人_召唤 = 2,
    敌人_宠物 = 3,
    自己 = 4,
    自己_召唤 = 5,
    自己_宠物 = 6,
    队友 = 7,
    队友_死亡 = 8,
    队友_召唤 = 9,
    队友_宠物 = 10
}
/**
 * 效果分类
 */
export declare enum SKILL_eff_type {
    伤害类 = "\u4F24\u5BB3\u7C7B",//物理 / 魔法 / 真实
    恢复类 = "\u6062\u590D\u7C7B",// 回血 / 回蓝 / 复活
    召唤 = "\u53EC\u5524",
    增益 = "\u589E\u76CA",
    减益 = "\u589E\u76CA",
    控制 = "\u63A7\u5236"
}
export declare enum SKILL_eff_type_伤害类 {
    物理伤害 = "\u7269\u7406\u4F24\u5BB3",
    魔法伤害 = "\u9B54\u6CD5\u4F24\u5BB3",
    真实伤害 = "\u771F\u5B9E\u4F24\u5BB3"
}
export declare enum SKILL_eff_type_恢复类 {
    生命恢复 = 0,
    魔法恢复 = 1
}
export declare enum SKILL_rang {
    单体伤害 = 0,
    范围伤害 = 1
}
