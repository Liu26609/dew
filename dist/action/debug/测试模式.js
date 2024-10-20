"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const common_1 = __importDefault(require("../../lib/common"));
const _path = require('path');
class default_1 {
    constructor(cls, path) {
        if (!__1.CFG.调试模式) {
            console.log('调试模式关闭中');
            return;
        }
        if (!path) {
            console.log('没有输入调试路径');
            return;
        }
        const classPath = _path.resolve(__dirname, `./${path}`);
        common_1.default.importClass(classPath, [cls]);
    }
}
exports.default = default_1;
