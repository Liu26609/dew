"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../../server"));
class default_1 {
    constructor(cls, data) {
        console.log('开始历练', data);
        this.start(cls);
    }
    async start(cls) {
        await server_1.default.api('player/map/Start', { name: '' }, cls);
    }
}
exports.default = default_1;
