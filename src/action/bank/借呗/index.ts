import actionCfg from "../../../cfg/actionCfg"


export default class {
    constructor() {
        actionCfg.push({
            key: "主神/银行/借呗",
            key_tips: '借呗',
            tips: "借呗",
            example: ["@bot 借呗"],
            path: 'bank/借呗/home'
        })
        actionCfg.push({
            key: "主神/银行/借呗还款",
            key_tips: '借呗还款',
            tips: "借呗还款",
            example: ["@bot 借呗还款"],
            path: 'bank/借呗/还款'
        })
        actionCfg.push({
            key: "主神/银行/借呗借款",
            key_tips: '借呗借款',
            tips: "借呗借款",
            example: ["@bot 借呗借款"],
            path: 'bank/借呗/借款'
        })
    }
}