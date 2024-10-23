"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let actionCfg = [];
actionCfg.push({
    key: "日常活动/签到",
    key_tips: '每日一签',
    tips: "签到天数越多奖励越多\n每日签到排名越高奖励越多",
    example: ["@bot 签到"],
    path: "active/签到"
});
actionCfg.push({
    key: "世界/逃跑",
    key_tips: '保命要紧，战术撤退',
    tips: "",
    example: ["@bot 逃跑"],
    path: "battle/逃跑"
});
actionCfg.push({
    key: "世界/探索",
    key_tips: '前面的蛆以后再探索叭',
    tips: "",
    example: ["@bot 探索"],
    path: "player/map/探索"
});
actionCfg.push({
    key: "世界/历练 <世界名:string>",
    key_tips: '进入轮回世界历练变强',
    tips: "",
    example: ["@bot 开始历练", "@bot 开始历练 火影忍者"],
    path: "player/map/开始历练"
});
actionCfg.push({
    key: "世界/战斗",
    key_tips: '战斗！爽！',
    tips: "立刻开始即将发生的战斗",
    example: ["@bot 战斗"],
    path: "battle/战斗"
});
actionCfg.push({
    key: "世界/位置",
    key_tips: '查看当前世界信息',
    tips: "位置",
    example: ["@bot 位置"],
    path: 'player/info/位置'
});
actionCfg.push({
    key: "世界/离开",
    key_tips: '离开当前世界回到主神空间',
    tips: "离开",
    example: ["@bot 离开"],
    path: 'player/map/离开'
});
actionCfg.push({
    key: "debug <调试路径:string>",
    key_tips: '开发测试',
    tips: "开发测试",
    example: ["@bot debug"],
    path: 'debug/测试模式'
});
actionCfg.push({
    key: "基础指令",
    key_tips: '基础指令',
    tips: "基础指令",
    example: ["@bot 基础指令"],
    path: 'common/menu'
});
actionCfg.push({
    key: "sys.userinfo",
    key_tips: '展示用户id',
    tips: "sys",
    example: ["@bot sys"],
    path: 'sys/info'
});
actionCfg.push({
    key: "角色/改名",
    key_tips: '角色改名',
    tips: "改名",
    example: ["@bot 改名"],
    path: 'player/info/改名'
});
actionCfg.push({
    key: "角色/背包 <操作:string><ID:number>",
    key_tips: '查看我的背包',
    tips: "背包",
    example: ["@bot 背包", "@bot 背包查看 ID"],
    path: 'player/info/背包'
});
actionCfg.push({
    key: "角色/属性",
    key_tips: '查看我的属性',
    tips: "属性",
    example: ["@bot 属性"],
    path: 'player/info/属性'
});
actionCfg.push({
    key: "角色/血统 <操作:string>",
    key_tips: '角色血统相关指令',
    tips: "血统",
    example: ["@bot 血统(查看血统信息)", "@bot 血统 重置"],
    path: 'player/info/血统'
});
actionCfg.push({
    key: "角色/技能 <操作:string><技能ID:number>",
    key_tips: '角色技能相关指令',
    tips: '📖手册(:文档还在编辑哩',
    example: [
        "@bot 技能(查看技能列表)",
        "@bot 技能查看 ID",
        "@bot 技能遗忘 ID",
        "@bot 技能改名 ID 新名字",
    ],
    path: 'player/info/技能'
});
actionCfg.push({
    key: "角色/装备 <操作:string><技能ID:number>",
    key_tips: '装备相关指令',
    tips: "📖手册(:装备文档还在编辑哩",
    example: [
        "@bot 装备(查看我的装备)",
        "@bot 装备查看 ID",
        "@bot 装备卸下 ID",
        "@bot 装备改名 ID 新名称",
    ],
    path: 'player/info/装备'
});
exports.default = actionCfg;
