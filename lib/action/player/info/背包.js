"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../../server"));
class default_1 {
    constructor(cls, ...data) {
        console.log('背包', data);
        this.start(cls, ...data);
    }
    async start(cls, ...data) {
        if (!data || data.length == 0) {
            this.list(cls);
        }
        else if (data.length >= 1) {
            switch (data[0]) {
                case '查看':
                    this.look(cls, data[1]);
                    break;
                default:
                    this.list(cls);
                    break;
            }
        }
    }
    async list(cls) {
        let req = await server_1.default.api('player/bag/List', {}, cls);
        if (!req)
            return;
        let temp = `背包信息\n`;
        for (let i = 0; i < req.list.length; i++) {
            const element = req.list[i];
            temp += `[${i + 1}]┃${element.name}X${element.cont}\n`;
        }
        if (req.list.length == 0) {
            temp += `你的背包里什么东西都没有呢~`;
        }
        cls.addLine(temp);
        cls.send();
    }
    async look(cls, idx) {
    }
}
exports.default = default_1;
