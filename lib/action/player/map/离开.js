"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../../server"));
class default_1 {
    constructor(cls, data) {
        this.start(cls);
    }
    async start(cls) {
        let req = await server_1.default.api('player/map/Out', {}, cls);
        if (!req)
            return;
        cls.addLine('🔵已回到主神空间');
        cls.send();
    }
}
exports.default = default_1;
