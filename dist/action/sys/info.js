"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(require("os"));
class default_1 {
    constructor(cls) {
        // 获取空闲内存和总内存
        const freeMemory = os.freemem();
        const totalMemory = os.totalmem();
        const userName = cls.get_name();
        const memoryUsage = ((totalMemory - freeMemory) / totalMemory) * 100;
        cls.addLine(`[from]${cls.platform}-[${cls.jude_private() ? '群组' : '私信'}]`);
        cls.addLine(`[bot]${cls.get_botName()}`);
        cls.addLine(`[user]${userName}-${cls.get_userId()}`);
        cls.addLine(`内存率: ${memoryUsage.toFixed(2)}%`);
        cls.send();
    }
}
exports.default = default_1;
