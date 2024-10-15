export enum SKILL_type {
    主动技能,
    被动技能
}
export enum SKILL_target{
    敌人,
    敌人_死亡,
    敌人_召唤,
    敌人_宠物,
    自己,
    自己_召唤,
    自己_宠物,
    队友,
    队友_死亡,
    队友_召唤,
    队友_宠物
}
/**
 * 效果分类
 */
export enum SKILL_eff_type {
    伤害类 = '伤害类', //物理 / 魔法 / 真实
    恢复类 = '恢复类', // 回血 / 回蓝 / 复活
    召唤 = '召唤',
    增益 = '增益',
    减益 = '增益',
    控制 = '控制',
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
export enum SKILL_rang{
    单体伤害,
    范围伤害
}
// web temp
let effTableCfg = [
    {
        name: '伤害类',
        vaule: SKILL_eff_type.伤害类,
        desc:'对单位造成伤害',
        children: [
            {
                name: '物理伤害',
                desc:'这是效果描述',
                vaule: SKILL_eff_type_伤害类.物理伤害,
                temp:{
                    // 数值
                    val_str:`攻击力*1.5+防御力`
                }
            }
        ]
    },
    {
        name:'恢复类',
        vaule: SKILL_eff_type.恢复类,
        desc:'对单位恢复状态',
        children:[
            {
                name:'生命恢复',
                desc:'效果描述',
                vaule: SKILL_eff_type_恢复类.生命恢复
            }
        ]
    }
]