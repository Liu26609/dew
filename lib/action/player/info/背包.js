"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../../server"));
const temp_text_1 = __importDefault(require("../../../temp/temp_text"));
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
                case '使用':
                    this.use(cls, data[1], Number(data[2]) || 1);
                    break;
                default:
                    this.list(cls);
                    break;
            }
        }
    }
    async use(cls, idx, num = 1) {
        let req = await server_1.default.api('player/bag/Use', { idx: idx, cont: num }, cls);
        console.log('背包使用');
    }
    async list(cls) {
        let req = await server_1.default.api('player/bag/List', {}, cls);
        temp_text_1.default.bag_list(req, cls);
    }
    async look(cls, idx) {
        let req = await server_1.default.api('player/bag/Look', { idx: idx }, cls);
        temp_text_1.default.prop_look(req, cls);
    }
}
exports.default = default_1;
