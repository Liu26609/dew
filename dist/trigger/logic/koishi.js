"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
    constructor(ctx) {
    }
    getType(ctx) {
        let t = 'none';
        switch (ctx.type) {
            case 'message-created':
                // 平台测试消息
                t = 'message';
                break;
            default:
                break;
        }
        return t;
    }
}
exports.default = default_1;
