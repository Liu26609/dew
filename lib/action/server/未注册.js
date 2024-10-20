"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
class default_1 {
    constructor(cls, data) {
        this.step(cls, data);
    }
    step(cls, data) {
        return __awaiter(this, void 0, void 0, function* () {
            cls.addLine('未注册,请注册，输入用户名');
            cls.send();
            let input = yield cls.wait_nextInput();
            if (!input) {
                cls.addLine('等待输入超时');
                cls.send();
                return;
            }
            server_1.default.api('player/info/SetName', { new: input }, cls);
        });
    }
}
exports.default = default_1;
