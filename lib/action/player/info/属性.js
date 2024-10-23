"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APP_1 = __importDefault(require("../../../APP"));
const server_1 = __importDefault(require("../../../server"));
class default_1 {
    constructor(cls) {
        this.start(cls);
    }
    async start(cls) {
        let req = await server_1.default.api('player/info/GetBase', {}, cls);
        if (!req)
            return;
        let _s = req.sys;
        cls.addLine('┏┄══✉️我的属性══━┄');
        cls.addLine(`🧙${req.name}`);
        cls.addLine(`🔯血统:${req.inherit}[${req.className}]`);
        let attList = req.att;
        for (let i = 0; i < attList.length; i++) {
            const att = attList[i];
            if (att.hide)
                continue;
            let icon;
            switch (att.key) {
                case '战斗力':
                    icon = '🔥';
                    break;
                default:
                    break;
            }
            switch (att.t) {
                case 'body_bar':
                    cls.addLine(`┃${APP_1.default.getSysCover(_s, att.name)}:${att.now}/${att.max}`);
                    break;
                case 'att_val':
                    if (att.val == 0) {
                        continue;
                    }
                    cls.addLine(`${icon || '┃'}${APP_1.default.getSysCover(_s, att.name)}:${att.val}`);
                    break;
                default:
                    cls.addLine('┃未知属性类型:' + att.t);
                    break;
            }
        }
        cls.addLine('┗━━━━━━━━━━━━┄');
        cls.send();
    }
}
exports.default = default_1;
