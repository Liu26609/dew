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
const battleText_1 = __importDefault(require("../../lib/battleText"));
class default_1 {
    constructor(cls, data) {
        console.log('回合战斗', data);
        this.start(cls, data);
    }
    start(cls, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let req = data.data;
            let temp = `┏┄═══🔵${req.title}═━┄\n`;
            temp += `${req.tips}\n`;
            temp += `╞════🔵我方统计═━┄\n`;
            temp += battleText_1.default.getSkLog(req.skLog[0]);
            temp += `╞════🔵敌方统计═━┄\n`;
            temp += battleText_1.default.getSkLog(req.skLog[1]);
            // 战斗数据
            temp += battleText_1.default.getData(req.dataLog[0]);
            temp += `战斗共计${req.round}回合\n`;
            temp += battleText_1.default.getKillLog(req.killLog);
            /**
             * 11->xxx击杀xxx
             * 22->xxx击杀xxx
             */
            temp += `╞════🔵战斗收获═━┄\n`;
            let gifts = req.gitfs;
            for (let index = 0; index < gifts.length; index++) {
                const element = gifts[index];
                temp += `🎁${element.name}x${element.cont}\n`;
            }
            console.log(temp);
            cls.addLine(temp);
            cls.send();
        });
    }
}
exports.default = default_1;
