"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.att_val = exports.att_line = exports.body_line = exports.body_bar = exports._bodyCom = void 0;
const common_1 = __importDefault(require("../../common"));
class _bodyCom {
    constructor() {
        this.t = this.constructor.name;
    }
}
exports._bodyCom = _bodyCom;
/**
 * 属性:进度条
 */
class body_bar extends _bodyCom {
    constructor(data) {
        super();
        this.name = '?';
        this.key = '?';
        this.max = 100;
        this.now = 0;
        this.lastTime = Date.now();
        this.name = data.name || this.name;
        this.key = data.key || this.key;
        this.max = data.max || this.max;
        this.now = data.now || this.now;
        this.lastTime = data.lastTime || Date.now();
    }
    getVal() {
        return this.now;
    }
    setVal(val) {
        this.now = val;
    }
    getMax() {
        return this.max;
    }
    setMax(val) {
        this.max = val;
    }
}
exports.body_bar = body_bar;
class body_line extends _bodyCom {
    constructor() {
        super();
        this.min = 0;
        this.max = 0;
    }
    getVal() {
        return common_1.default.random(this.min, this.max);
    }
}
exports.body_line = body_line;
/**
 * 属性:数值范围
 */
class att_line extends _bodyCom {
    constructor(data) {
        super();
        this.val = new body_line();
        this.name = data.name;
        this.key = data.key;
    }
    getVal() {
        return this.getVal();
    }
    setVal(val) {
        console.log('setVal:范围类属性无法设置val', val);
    }
}
exports.att_line = att_line;
/**
 * 属性:数值
 */
class att_val extends _bodyCom {
    constructor(data) {
        super();
        this.hide = false;
        this.name = data.name;
        this.key = data.key;
        this.val = data.val || 0;
        this.hide = data.hide || this.hide;
    }
    getVal() {
        return this.val;
    }
    setVal(val) {
        if (typeof (val) != 'number') {
            return;
        }
        this.val = val;
    }
}
exports.att_val = att_val;
