interface _data {
    /**
     * command
     */
    key: string;
    key_tips: string;
    // option:string;
    /**
     * usage
     */
    tips: string;
    example: string[];
    path: string
}
let actionCfg: _data[] = [];

actionCfg.push({
    key: "世界/逃跑",
    key_tips: '保命要紧，战术撤退',
    tips: "",
    example: ["@bot 逃跑"],
    path: "battle/逃跑"
})
actionCfg.push({
    key: "世界/探索",
    key_tips: '前面的蛆以后再探索叭',
    tips: "",
    example: ["@bot 探索"],
    path: "player/map/探索"
})
actionCfg.push({
    key: "世界/历练 <世界名:string>",
    key_tips: '进入轮回世界历练变强',
    tips: "",
    example: ["@bot 开始历练", "@bot 开始历练 火影忍者"],
    path: "player/map/开始历练"
})
actionCfg.push({
    key: "世界/战斗",
    key_tips: '战斗！爽！',
    tips: "立刻开始即将发生的战斗",
    example: ["@bot 战斗"],
    path: "battle/战斗"
})
actionCfg.push({
    key: "世界/位置",
    key_tips: '查看当前世界信息',
    tips: "查看角色当前所处位置",
    example: ["@bot 位置"],
    path: 'player/info/位置'
})
actionCfg.push({
    key: "世界/离开",
    key_tips: '离开当前世界回到主神空间',
    tips: "离开",
    example: ["@bot 离开"],
    path: 'player/map/离开'
})


actionCfg.push({
    key: "debug <调试路径:string>",
    key_tips: '开发测试',
    tips: "开发测试",
    example: ["@bot debug"],
    path: 'debug/测试模式'
})
actionCfg.push({
    key: "基础指令",
    key_tips: '基础指令',
    tips: "基础指令",
    example: ["@bot 基础指令"],
    path: 'common/菜单'
})



actionCfg.push({
    key: "sys.userinfo",
    key_tips: '展示用户id',
    tips: "sys",
    example: ["@bot sys"],
    path: 'sys/info'
})

actionCfg.push({
    key: "设置 <设置项:string>",
    key_tips: '个人相关设置',
    tips: "📖手册(:设置文档还在编辑哩",
    example: [
        "@bot 设置(查看可设置列表)",
        "@bot 设置 设置项 (设置参数)",
        "@bot 设置 消息模式 图片/文字",
    ],
    path: 'common/设置'
})
export default actionCfg;