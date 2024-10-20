"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = __importDefault(require("../message"));
class default_1 extends message_1.default {
    constructor(ctx) {
        console.log('[koishi-收到消息]', ctx.content);
        super(ctx, 'koishi');
    }
}
exports.default = default_1;
