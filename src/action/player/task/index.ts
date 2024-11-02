import actionCfg from "../../../cfg/actionCfg";

export default class {
    constructor(){
        actionCfg.push({
            key: "每日任务",
            key_tips: '离开当前世界回到主神空间',
            tips: "离开",
            example: ["@bot 离开"],
            path: 'player/task/每日任务'
        })
    }
}