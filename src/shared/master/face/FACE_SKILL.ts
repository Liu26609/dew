
export enum SKILL_target{
    敌方 = '敌方',
    // 敌人_死亡,
    // 敌人_召唤,
    // 敌人_宠物,
    自己 = '自己',
    // 自己_召唤,
    // 自己_宠物,
    // 我方,
    // 队友_死亡,
    // 队友_召唤,
    // 队友_宠物
}
/**
 * 效果分类
 */
export enum SKILL_eff_type {
    伤害类 = '伤害类', //物理 / 魔法 / 真实
    恢复类 = '恢复类', // 回血 / 回蓝 / 复活
    召唤类 = '召唤类',
    增益类 = '增益类',
    减益类 = '增益类',
    控制类 = '控制类',
}
export enum SKILL_eff_path{
    动作 = 'action',
    buff = 'buff'
}
export enum SKILL_eff_type_增益类 {
    附加暴击 = '附加暴击',
    魔法伤害 = '魔法伤害',
    真实伤害 = '真实伤害',
}
export enum SKILL_eff_type_伤害类 {
    物理伤害 = '物理伤害',
    魔法伤害 = '魔法伤害',
    真实伤害 = '真实伤害',
}
export enum SKILL_eff_type_恢复类 {
    生命恢复,
    魔法恢复,
}
export enum SKILL_eff_condition{
    受到普通攻击时 = '受到普通攻击时',
}
export enum SKILL_rang{
    单体,
    范围
}

export enum Buff_keys{
    无敌 = '无敌',
    沉默 = '沉默',
    晕眩 = '晕眩',
    眩晕 = '眩晕',
    禁锢 = '禁锢',
    击飞 = '击飞',
    击退 = '击退',
    击倒 = '击倒',
    冰冻 = '冰冻',
    燃烧 = '燃烧',
    流血 = '流血',
    中毒 = '中毒',
    灼烧 = '灼烧',
    减速 = '减速',
    加速 = '加速',
    隐身 = '隐身',
    霸体 = '霸体',
    魔免 = '魔免',
    物免 = '物免'
}