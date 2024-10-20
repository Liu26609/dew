"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { v4: uuidv4 } = require('uuid');
class common {
    constructor() {
    }
    v4() {
        const uuid = uuidv4();
        return uuid;
    }
    // 延时函数
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    // 生成指定范围的随机数
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // 引入指定类
    importClass(path, agm) {
        const effectModule = require(`${path}.ts`);
        const EffectClass = effectModule.default;
        return new EffectClass(...agm);
    }
}
exports.default = new common();
