"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../../server"));
class default_1 {
    constructor(cls) {
        this.init(cls);
    }
    async init(cls) {
        let res = await server_1.default.api('player/map/Search', {}, cls);
        console.log(res);
        if (!res)
            return;
        switch (res.type) {
            case 'monster':
                // 发现怪物
                this.search_monster(cls, res.data);
                break;
            default:
                break;
        }
    }
    search_monster(cls, data) {
        let temp = `╞════🔵发现敌人═━┄\n`;
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            temp += `🔵${element.name}`;
            // 最后一行不要\n
            if (i == data.length - 1) {
                temp += '\n';
            }
            else {
                temp += `\n`;
            }
        }
        temp += `[战斗]开始快速战斗\n`;
        temp += `[探索]继续探索\n`;
        cls.addLine(temp);
        cls.send();
    }
}
exports.default = default_1;
