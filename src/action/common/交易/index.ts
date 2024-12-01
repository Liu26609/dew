
import actionCfg from "../../../cfg/actionCfg"


export default class {
    constructor() {
        actionCfg.push({
            key: "确认",
            key_tips: '确认',
            tips: "确认",
            example: ["@bot 确认"],
            path: 'common/交易/确认'
        })
        actionCfg.push({
            key: "取消",
            key_tips: '取消',
            tips: "取消",
            example: ["@bot 取消"],
            path: 'common/交易/取消'
        })
    }
}