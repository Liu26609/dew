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
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(call) {
    return __awaiter(this, void 0, void 0, function* () {
        let p = call.req._player;
        let equips = p.equips;
        let req = [];
        for (let i = 0; i < equips.length; i++) {
            const element = equips[i];
            if (!element) {
                req.push(undefined);
                continue;
            }
            req.push({
                name: element.name,
                type: "法宝"
            });
        }
        call.succ({ list: req });
    });
}
exports.default = default_1;
