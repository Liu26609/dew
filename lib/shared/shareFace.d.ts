export declare enum SKILL_type {
    主动技能 = 0,
    被动技能 = 1
}
export declare enum Item_Type {
    经验 = 0,
    技能书 = 1,
    装备 = 2,
    道具 = 3,
    none = 4
}
export interface prop_item {
    name: string;
    type: Item_Type;
    cont?: number;
    data?: any;
}
export declare enum body_sys {
    修仙 = "\u4FEE\u4ED9",
    斗罗 = "\u6597\u7F57",
    魔法 = "\u9B54\u6CD5",
    科幻 = "\u79D1\u5E7B",
    玄幻 = "\u7384\u5E7B",
    火影忍者 = "\u706B\u5F71\u5FCD\u8005"
}
/**
 * 修仙系统允许装备 [法宝,本名法宝.]
 * 古代科技 [手枪]
 * 现代科技 [手枪]
 * 系统 + 装备类型
 *
 * 装备类型  修仙-法宝
 *
 * 角色: 修仙
 * 装备栏位 [法宝]
 * 如果没有 则随机一个位置装备 并且效果只生效 80% 不再附带技能
 */
export declare enum _att_key {
    战斗力 = "\u6218\u6597\u529B",
    生命值 = "\u751F\u547D\u503C",
    生命恢复 = "\u751F\u547D\u6062\u590D",
    魔法值 = "\u9B54\u6CD5\u503C",
    魔法恢复 = "\u9B54\u6CD5\u6062\u590D",
    等级 = "\u7B49\u7EA7",
    经验值 = "\u7ECF\u9A8C\u503C",
    物理攻击 = "\u7269\u7406\u653B\u51FB",
    魔法攻击 = "\u9B54\u6CD5\u653B\u51FB",
    物理防御 = "\u7269\u7406\u9632\u5FA1",
    魔法防御 = "\u9B54\u6CD5\u9632\u5FA1",
    技能急速 = "\u6280\u80FD\u6025\u901F",
    物理暴击率 = "\u7269\u7406\u66B4\u51FB\u7387",
    魔法暴击率 = "\u9B54\u6CD5\u66B4\u51FB\u7387",
    物理护盾 = "\u7269\u7406\u62A4\u76FE",
    魔法护盾 = "\u9B54\u6CD5\u62A4\u76FE",
    生命护盾 = "\u751F\u547D\u62A4\u76FE"
}
