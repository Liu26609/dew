import actionCfg from "../../../cfg/actionCfg";

export default class {
    constructor(){
        actionCfg.push({
            key: "随从/随从聊天 <聊天内容:string>",
            key_tips: '随从 + 聊天内容',
            tips: "随从聊天",
            example: ["@bot 随从聊天 你在干嘛"],
            path: 'player/Follow/随从聊天'
        })
        actionCfg.push({
            key: "随从/当前随从",
            key_tips: '查看当前上阵随从',
            tips: "查看当前上阵随从",
            example: ["@bot 当前随从"],
            path: 'player/Follow/当前随从'
        })
        actionCfg.push({
            key: "随从/随从列表",
            key_tips: '查看随从列表',
            tips: "查看随从列表",
            example: ["@bot 随从列表"],
            path: 'player/Follow/随从列表'
        })
        actionCfg.push({
            key: "随从/随从上阵 <随从ID:string>",
            key_tips: '随从上阵',
            tips: "随从上阵",
            example: ["@bot 随从上阵 1"],
            path: 'player/Follow/随从上阵'
        })
    }
}