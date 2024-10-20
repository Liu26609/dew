"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = __importDefault(require("../message"));
class default_1 extends message_1.default {
    constructor(ctx) {
        ctx.content = ctx.content.replace(/<[^>]*>/gi, '').trim();
        ctx.content = ctx.content.replace('/', '');
        console.log('[qq-收到消息]', ctx.content);
        super(ctx, 'qq');
    }
    send() {
        super.send();
    }
    get_name() {
        return '匿名用户';
    }
    At() {
        return '@' + this.get_name();
    }
}
exports.default = default_1;
