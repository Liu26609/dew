"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let actionCfg = [];
actionCfg.push({
    key: "日常活动/签到",
    key_tips: '每日一签',
    tips: "签到天数越多奖励越多\n每日签到排名越高奖励越多",
    example: ["@机器人 签到"],
    path: "active/签到"
});
actionCfg.push({
    key: "世界/逃跑",
    key_tips: '保命要紧，战术撤退',
    tips: "",
    example: ["@机器人 逃跑"],
    path: "battle/逃跑"
});
actionCfg.push({
    key: "世界/探索",
    key_tips: '前面的蛆以后再探索叭',
    tips: "",
    example: ["@机器人 探索"],
    path: "player/map/探索"
});
actionCfg.push({
    key: "世界/历练 <世界名:string>",
    key_tips: '进入轮回世界历练变强',
    tips: "",
    example: ["@机器人 开始历练", "@机器人 开始历练 火影忍者"],
    path: "player/map/开始历练"
});
actionCfg.push({
    key: "世界/战斗",
    key_tips: '战斗！爽！',
    tips: "立刻开始即将发生的战斗",
    example: ["@机器人 战斗"],
    path: "battle/战斗"
});
actionCfg.push({
    key: "世界/位置",
    key_tips: '查看当前世界信息',
    tips: "位置",
    example: ["@机器人 位置"],
    path: 'player/info/位置'
});
actionCfg.push({
    key: "debug <调试路径:string>",
    key_tips: '开发测试',
    tips: "开发测试",
    example: ["@机器人 debug"],
    path: 'debug/测试模式'
});
actionCfg.push({
    key: "基础指令",
    key_tips: '基础指令',
    tips: "基础指令",
    example: ["@机器人 基础指令"],
    path: 'common/menu'
});
actionCfg.push({
    key: "sys.userinfo",
    key_tips: '展示用户id',
    tips: "sys",
    example: ["@机器人 sys"],
    path: 'sys/info'
});
actionCfg.push({
    key: "角色/改名",
    key_tips: '角色改名',
    tips: "改名",
    example: ["@机器人 改名"],
    path: 'player/info/改名'
});
actionCfg.push({
    key: "角色/属性",
    key_tips: '查看我的属性',
    tips: "属性",
    example: ["@机器人 属性"],
    path: 'player/info/属性'
});
exports.default = actionCfg;