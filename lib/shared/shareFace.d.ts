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
    古代科技 = "\u53E4\u4EE3\u79D1\u6280",
    现代科技 = "\u73B0\u4EE3\u79D1\u6280",
    未来科技 = "\u672A\u6765\u79D1\u6280",
    西方神话 = "\u897F\u65B9\u4F20\u8BF4",
    东方神话 = "\u4E1C\u65B9\u795E\u8BDD"
}
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
