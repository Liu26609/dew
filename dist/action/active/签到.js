"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
class default_1 {
    constructor(cls) {
        this.init(cls);
    }
    init(cls) {
        return __awaiter(this, void 0, void 0, function* () {
            let req = yield server_1.default.api('active/Sign', {}, cls);
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
        });
    }
}
exports.default = default_1;
