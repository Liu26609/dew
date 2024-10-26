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
const bags_1 = require("../../../lib/unity/base/bags");
const MsgAction_1 = require("../../../../shared/master/MsgAction");
function default_1(call) {
    return __awaiter(this, void 0, void 0, function* () {
        let p = call.req._player;
        let bag = p.bag;
        if (!bag.items[call.req.idx - 1]) {
            p.sendMessageg('Action', {
                template: MsgAction_1.template.文本消息,
                data: `[使用失败]背包中没有ID为${call.req.idx}的物品`,
                messageId: ''
            });
            call.error(`背包中没有ID为${call.req.idx}的物品`);
            return;
        }
        bag.useItem(bags_1.bag_getType.index, call.req.idx - 1, call.req.cont);
        call.succ({});
    });
}
exports.default = default_1;
