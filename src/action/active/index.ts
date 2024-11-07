import actionCfg from "../../cfg/actionCfg";

export default class {
    constructor(){
        actionCfg.push({
            key: "日常活动/技能祈愿 <选择:string>",
            key_tips: 'AI生成技能',
            tips: "打造属于你独一无二的技能",
            example: ["@bot 技能祈愿","@bot 技能祈愿 普通","@bot 技能祈愿 高级"],
            path: "active/技能祈愿"
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