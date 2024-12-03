import actionCfg from "../../../cfg/actionCfg"


export default class {
    constructor() {
        actionCfg.push({
            key: "操作/是",
            key_tips: '是',
            tips: "是",
            example: ["@bot 是"],
            path: 'common/操作/是'
        })
        actionCfg.push({
            key: "操作/否",
            key_tips: '否',
            tips: "否",
            example: ["@bot 否"],
            path: 'common/操作/否'
        })
    }
}