"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const path = require('path');
class default_1 {
    constructor(cls) {
        server_1.default.api('debug/TakeOffEquip', {}, cls);
    }
}
exports.default = default_1;
