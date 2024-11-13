import actionCfg from "../../../cfg/actionCfg"


export default class {
    constructor() {
        actionCfg.push({
            key: "主神/银行",
            key_tips: '主神银行',
            tips: "银行",
            example: ["@bot 银行"],
            path: 'bank/银行/home'
        })
        actionCfg.push({
            key: "主神/银行/存入",
            key_tips: '存入金币',
            tips: "存入金币",
            example: ["@bot 存入金币"],
            path: 'bank/银行/存入'
        })
        actionCfg.push({
            key: "主神/银行/取出",
            key_tips: '取出',
            tips: "取出金币",
            example: ["@bot 取出金币"],
            path: 'bank/银行/取出'
        })
    }
}