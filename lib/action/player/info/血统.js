"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APP_1 = __importDefault(require("../../../APP"));
const server_1 = __importDefault(require("../../../server"));
class default_1 {
    constructor(cls, ...data) {
        console.log('血统', data);
        this.start(cls, ...data);
    }
    async start(cls, ...data) {
        if (!data || data.length == 0) {
            this.look(cls);
        }
        else if (data.length == 1) {
            switch (data[0]) {
                case '重置':
                    this.reset(cls);
                    break;
                default:
                    this.look(cls);
                    break;
            }
        }
    }
    async reset(cls) {
        // 重置血统
        let req = await server_1.default.api('player/inherit/Reset', {}, cls);
        if (!req)
            return;
        cls.addLine(`重置完成`);
        cls.send();
        this.look(cls);
    }
    async look(cls) {
        // 查看血统
        let req = await server_1.default.api('player/inherit/Info', {}, cls);
        if (!req)
            return;
        let _s = req.sys;
        if (!APP_1.default.bodySysCfg.has(_s)) {
            let req_cfg = await server_1.default.api('common/GetBodySysCfg', { key: _s });
            if (req_cfg) {
                APP_1.default.setSysCfg(req_cfg.cfg);
            }
        }
        let temp = `🔵血统信息\n`;
        temp += `🔵名称:${req.name}\n`;
        temp += `🔵来源:${req.from}\n`;
        temp += `----血统成长\n`;
        for (let i = 0; i < req.att.length; i++) {
            const element = req.att[i];
            temp += `┃${APP_1.default.getSysCover(_s, element.name)}:${element.val}\n`;
        }
        if (req.skills.length > 0) {
            temp += `----血统技能\n`;
            for (let i = 0; i < req.skills.length; i++) {
                const element = req.skills[i];
                temp += `┃${element}\n`;
            }
        }
        cls.addLine(temp);
        cls.send();
    }
}
exports.default = default_1;
