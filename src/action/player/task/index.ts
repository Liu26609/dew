import actionCfg from "../../../cfg/actionCfg";

export default class {
    constructor(){
        actionCfg.push({
            key: "每日任务",
            key_tips: '离开当前世界回到主神空间',
            tips: "离开",
            example: ["@bot 离开"],
            path: 'player/task/查看任务'
        })
        actionCfg.push({
            key: "每周任务",
            key_tips: '离开当前世界回到主神空间',
            tips: "离开",
            example: ["@bot 离开"],
            path: 'player/task/查看任务'
        })
        actionCfg.push({
            key: "探索任务",
            key_tips: '探索任务',
            tips: "探索任务",
            example: ["@bot 探索任务"],
            path: 'player/task/查看任务'
        })
    }
}