import actionCfg from "../../../../cfg/actionCfg";

export default class{
    constructor(){
        actionCfg.push({
            key: "角色/绑定信息",
            key_tips: '绑定信息',
            tips: "绑定信息",
            example: [
                "@bot 绑定信息",
            ],
            path: 'player/info/账号/绑定信息'
        })
        actionCfg.push({
            key: "角色/绑定验证 <验证码:string>",
            key_tips: '绑定验证 + 验证内容',
            tips: "绑定验证",
            example: [
                "@bot 绑定验证",
            ],
            path: 'player/info/账号/绑定验证'
        }) 
        actionCfg.push({
            key: "角色/绑定账号",
            key_tips: '绑定账号',
            tips: "绑定账号",
            example: [
                "@bot 绑定账号",
            ],
            path: 'player/info/账号/绑定账号'
        }) 
    }
}