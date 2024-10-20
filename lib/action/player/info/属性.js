"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    start(cls) {
        return __awaiter(this, void 0, void 0, function* () {
            let req = yield server_1.default.api('player/info/GetBase', {}, cls);
            if (!req)
                return;
            let _s = req.sys;
            if (!APP_1.default.bodySysCfg.has(_s)) {
                let req_cfg = yield server_1.default.api('common/GetBodySysCfg', { key: _s });
                if (req_cfg) {
                    APP_1.default.setSysCfg(req_cfg.cfg);
                }
            }
            cls.addLine('┏┄══✉️我的属性══━┄');
            cls.addLine(`🧙${req.name}`);
            cls.addLine(`🔯血统)${req.inherit}[${req.className}]`);
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
        });
    }
}
exports.default = default_1;
