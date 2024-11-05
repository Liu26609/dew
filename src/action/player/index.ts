import actionCfg from "../../cfg/actionCfg"

export default class{
    constructor(){
        actionCfg.push({
            key: "角色",
            key_tips: '角色功能列表',
            tips: "角色",
            example: ["@bot 角色"],
            path: 'player/菜单'
        })
        actionCfg.push({
            key: "角色/角色改名",
            key_tips: '角色改名',
            tips: "改名",
            example: ["@bot 改名"],
            path: 'player/info/改名'
        })
        actionCfg.push({
            key: "角色/任务",
            key_tips: '超多奖励等你来拿',
            tips: "任务",
            example: ["@bot 任务"],
            path: 'player/task/菜单'
        })
        actionCfg.push({
            key: "角色/背包 <操作:string><ID:number>",
            key_tips: '查看我的背包',
            tips: "背包",
            example: [
                "@bot 背包",
                "@bot 背包查看 ID",
                "@bot 背包使用 ID 数量",
                "@bot 背包出售 ID 数量",
            ],
            path: 'player/info/背包'
        })
        actionCfg.push({
            key: "角色/属性",
            key_tips: '查看我的属性',
            tips: "属性",
            example: ["@bot 属性"],
            path: 'player/info/属性'
        })
        actionCfg.push({
            key: "角色/血统 <操作:string>",
            key_tips: '角色血统相关指令',
            tips: "血统",
            example: ["@bot 血统(查看血统信息)", "@bot 血统 重置"],
            path: 'player/info/血统'
        })
        actionCfg.push({
            key: "角色/技能 <操作:string><技能ID:number>",
            key_tips: '角色技能相关指令',
            tips: '📖手册(:文档还在编辑哩',
            example: [
                "@bot 技能(查看技能列表)",
                "@bot 技能查看 ID",
                "@bot 技能遗忘 ID",
                "@bot 技能改名 ID 新名字",
                "@bot 技能升级 ID",
            ],
            path: 'player/info/技能'
        })
        actionCfg.push({
            key: "角色/装备 <操作:string><技能ID:number>",
            key_tips: '装备相关指令',
            tips: "📖手册(:装备文档还在编辑哩",
            example: [
                "@bot 装备(查看我的装备)",
                "@bot 装备查看 ID",
                "@bot 装备卸下 ID",
                "@bot 装备强化 ID",
                "@bot 装备改名 ID 新名称",
            ],
            path: 'player/info/装备'
        })
    }
}