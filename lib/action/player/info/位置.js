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
        let req = await server_1.default.api('player/info/Position', {}, cls);
        if (!req)
            return;
        switch (req.name) {
            case '主神空间':
                cls.addLine('┏┄══✉️主神空间══━┄');
                cls.addLine('┃世界玩家:' + req.online);
                cls.addLine('┗━━━━━━━━━━━━┄');
                break;
            default:
                cls.addLine('┏┄══✉️我的位置══━┄');
                cls.addLine('┃当前世界:' + req.name);
                cls.addLine('┃世界玩家:' + req.online);
                cls.addLine('┃探索进度:' + req.pgs + '%');
                cls.addLine('┗━━━━━━━━━━━━┄');
                break;
        }
        cls.send();
    }
}
exports.default = default_1;
