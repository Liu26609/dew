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
const xlsxToJson_1 = __importDefault(require("../../../model/xlsxToJson"));
function default_1(call) {
    return __awaiter(this, void 0, void 0, function* () {
        let key = call.req.key;
        let cfg = xlsxToJson_1.default.cfg.get('sys_体系');
        if (cfg && cfg.has(key)) {
            call.succ({
                cfg: cfg.get(key)
            });
            return;
        }
        else {
            call.error('体系配置不存在');
        }
    });
}
exports.default = default_1;
