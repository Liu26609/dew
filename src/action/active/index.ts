import actionCfg from "../../cfg/actionCfg";

export default class {
    constructor(){
        actionCfg.push({
            key: "日常活动/技能祈愿 <选择:string>",
            key_tips: '单抽出奇迹',
            tips: "每日技能抽奖",
            example: ["@bot 技能祈愿","@bot 技能祈愿 普通","@bot 技能祈愿 高级"],
            path: "active/技能祈愿"
        })
        actionCfg.push({
            key: "日常活动/装备祈愿 <选择:string>",
            key_tips: '单抽出奇迹',
            tips: "每日装备抽奖",
            example: ["@bot 装备祈愿","@bot 装备祈愿 普通","@bot 装备祈愿 高级"],
            path: "active/装备祈愿"
        })
        actionCfg.push({
            key: "日常活动/签到",
            key_tips: '每日一签',
            tips: "签到天数越多奖励越多\n每日签到排名越高奖励越多",
            example: ["@bot 签到"],
            path: "active/签到"
        })
    }
}