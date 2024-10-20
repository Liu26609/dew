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
        let res = await server_1.default.api('battle/Battle', {}, cls);
        console.log(res);
    }
}
exports.default = default_1;
