import actionCfg from "../../../cfg/actionCfg"


export default class {
    constructor() {
        actionCfg.push({
            key: "主神/银行/花呗",
            key_tips: '花呗',
            tips: "花呗",
            example: ["@bot 花呗"],
            path: 'bank/花呗/home'
        })
        actionCfg.push({
            key: "主神/银行/花呗还款",
            key_tips: '花呗还款',
            tips: "花呗还款",
            example: ["@bot 花呗还款"],
            path: 'bank/花呗/还款'
        })
        actionCfg.push({
            key: "主神/银行/开启花呗付款",
            key_tips: '开启花呗付款',
            tips: "开启花呗付款",
            example: ["@bot 开启花呗付款"],
            path: 'bank/花呗/开启'
        })
        actionCfg.push({
            key: "主神/银行/关闭花呗付款",
            key_tips: '关闭花呗付款',
            tips: "关闭花呗付款",
            example: ["@bot 关闭花呗付款"],
            path: 'bank/花呗/关闭'
        })
    }
}