import actionCfg from "../../cfg/actionCfg";

export default class {
    constructor(){
        actionCfg.push({
            key: "商店/技能商店",
            key_tips: '查看当前技能商店出售的技能',
            tips: "技能商店",
            example: ["@bot 技能商店"],
            path: 'shop/技能商店'
        })
        actionCfg.push({
            key: "商店/装备商店",
            key_tips: '查看当前装备商店出售的装备',
            tips: "装备商店",
            example: ["@bot 装备商店"],
            path: 'shop/装备商店'
        })
        actionCfg.push({
            key: "商店/技能购买",
            key_tips: '购买技能商店中的技能',
            tips: "购买技能",
            example: ["@bot 技能购买"],
            path: 'shop/技能购买'
        })
        actionCfg.push({
            key: "商店/装备购买",
            key_tips: '购买装备商店中的装备',
            tips: "购买装备",
            example: ["@bot 装备购买"],
            path: 'shop/装备购买'
        })
    }
} 