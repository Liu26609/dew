"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APP_1 = __importDefault(require("../../../APP"));
const server_1 = __importDefault(require("../../../server"));
class default_1 {
    constructor(cls, ...data) {
        console.log('装备', data);
        this.start(cls, ...data);
    }
    async start(cls, ...data) {
        if (!data || data.length == 0) {
            this.list(cls);
        }
        else if (data.length >= 1) {
            switch (data[0]) {
                case '卸下':
                    this.takeOff(cls, data[1]);
                    break;
                case '改名':
                    this.rename(cls, data[1], data[2]);
                    break;
                case '查看':
                    this.look(cls, data[1]);
                    break;
                default:
                    this.list(cls);
                    break;
            }
        }
    }
    async rename(cls, idx, rename) {
        let req = await server_1.default.api('player/equip/ReName', { idx: idx, name: rename }, cls);
        if (!req)
            return;
        cls.addLine(`装备改名完成`);
        cls.send();
    }
    async takeOff(cls, idx) {
        let req = await server_1.default.api('player/equip/TakeOff', { idx: idx }, cls);
        if (!req)
            return;
    }
    async look(cls, idx) {
        let req = await server_1.default.api('player/equip/Look', { idx: idx }, cls);
        if (!req)
            return;
        let temp = `装备信息\n`;
        temp += `名称:${req.name}\n`;
        temp += `来源:${req.sys}\n`;
        temp += `----血统属性\n`;
        for (let i = 0; i < req.att.length; i++) {
            const element = req.att[i];
            temp += `┃${APP_1.default.getSysCover(req.sys, element.name)}:${element.val}\n`;
        }
        cls.addLine(temp);
        cls.send();
    }
    async list(cls) {
        // 查看血统
        let req = await server_1.default.api('player/equip/List', {}, cls);
        if (!req)
            return;
        let list = req.list;
        let temp = `🔵我的装备\n`;
        let useCont = 0;
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            if (!element) {
                continue;
            }
            useCont += 1;
            temp += `[${i + 1}]${element.type}·${element.name}\n`;
        }
        if (!useCont) {
            temp += `你身上还没有一件装备呢~`;
        }
        cls.addLine(temp);
        cls.send();
    }
}
exports.default = default_1;
