import actionCfg from "../../../../cfg/actionCfg";

export default class{
    constructor(){
        actionCfg.push({
            key: "角色/背包 <操作:string><ID:number>",
            key_tips: '我的背包',
            tips: "背包tips",
            example: [
                "@bot 背包",
                "@bot 背包查看 ID",
                "@bot 背包装备",
                "@bot 背包技能",
                "@bot 背包道具",
                "@bot 背包使用 ID 数量",
                "@bot 背包出售 ID 数量",
            ],
            path: 'player/info/背包/背包'
        })   
    }
}   