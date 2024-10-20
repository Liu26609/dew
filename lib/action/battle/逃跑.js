"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
class default_1 {
    constructor(cls) {
        this.init(cls);
    }
    async init(cls) {
        server_1.default.api('battle/Out', {}, cls);
    }
}
exports.default = default_1;
