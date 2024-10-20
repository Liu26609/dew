"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
class default_1 {
    constructor(cls, data) {
        this.step(cls, data);
    }
    async step(cls, data) {
        cls.addLine('未注册,请注册，输入用户名');
        cls.send();
        let input = await cls.wait_nextInput();
        if (!input) {
            cls.addLine('等待输入超时');
            cls.send();
            return;
        }
        server_1.default.api('player/info/SetName', { new: input }, cls);
    }
}
exports.default = default_1;
