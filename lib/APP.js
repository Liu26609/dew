"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_bot_1 = require("./index_bot");
const server_1 = __importDefault(require("./server"));
class APP {
    bodySysCfg = new Map();
    constructor() {
    }
    setSysCfg(cfg) {
        const groups = cfg.cover.split('\n');
        let m = new Map();
        for (const group of groups) {
            const parts = group.split('as');
            let temp = parts[0];
            let rename = parts[1];
            m.set(temp, rename);
        }
        this.bodySysCfg.set(cfg.id, m);
    }
    getSysCover(s, k) {
        if (this.bodySysCfg.has(s)) {
            let m = this.bodySysCfg.get(s);
            if (m && m.has(k)) {
                return m.get(k);
            }
        }
        return k;
    }
    async checkSys(s) {
        if (this.bodySysCfg.has(s)) {
            return true;
        }
        let req_cfg = await server_1.default.api('common/GetBodySysCfg', { key: s });
        if (req_cfg) {
            this.setSysCfg(req_cfg.cfg);
            return true;
        }
        index_bot_1.logger.error('未找到体系配置:', s);
    }
}
exports.default = new APP();
