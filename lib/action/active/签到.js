"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
class default_1 {
    constructor(cls) {
        this.init(cls);
    }
    async init(cls) {
        let req = await server_1.default.api('active/Sign', {}, cls);
        if (!req)
            return;
        let temp = `╞════🔵签到成功═━┄\n`;
        temp += `共计签到${req.consecutive_sign_count}天\n`;
        temp += `累计签到${req.sign_count}\n`;
        temp += `今日排名${req.todayRank}\n`;
        temp += `╞════🔵签到奖励═━┄\n`;
        let gifts = req.gitfs;
        for (let index = 0; index < gifts.length; index++) {
            const element = gifts[index];
            temp += `🎁${element.name}x${element.cont}\n`;
        }
        cls.addLine(temp);
        cls.send();
    }
}
exports.default = default_1;
