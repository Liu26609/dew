"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseCalss = void 0;
class baseCalss {
    constructor() {
    }
    // 销毁
    destroy() {
        for (const key in this) {
            this[key] = undefined;
        }
    }
    reload(data) {
        for (const key in data) {
            if (data[key]) {
                this[key] = data[key];
            }
        }
        return this;
    }
}
exports.baseCalss = baseCalss;
