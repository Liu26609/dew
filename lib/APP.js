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
    /**
     * 将数字转为中文
     * 1000 -> 1千
     * 10000 -> 1万
     * 100000000 -> 1亿
     * @param number
     * @returns
     */
    numberToChinese(number) {
        number = Math.floor(number * 100) / 100;
        const chineseUnits = ['', '千', '万', '亿'];
        const unitValues = [1, 1000, 10000, 100000000];
        let result = '';
        for (let i = unitValues.length - 1; i >= 0; i--) {
            if (number >= unitValues[i]) {
                const unitValue = Math.floor(number / unitValues[i]);
                number %= unitValues[i];
                result += unitValue + chineseUnits[i];
            }
        }
        return result || '0';
    }
}
exports.default = new APP();
