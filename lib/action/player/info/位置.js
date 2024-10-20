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
const server_1 = __importDefault(require("../../../server"));
class default_1 {
    constructor(cls) {
        this.init(cls);
    }
    init(cls) {
        return __awaiter(this, void 0, void 0, function* () {
            let req = yield server_1.default.api('player/info/Position', {}, cls);
            if (!req)
                return;
            cls.addLine('┏┄══✉️我的位置══━┄');
            cls.addLine('┃当前世界:' + req.name);
            cls.addLine('┃世界玩家:' + req.online);
            cls.addLine('┗━━━━━━━━━━━━┄');
            cls.send();
        });
    }
}
exports.default = default_1;
