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
const MsgAction_1 = require("../../../../shared/master/MsgAction");
function default_1(call) {
    return __awaiter(this, void 0, void 0, function* () {
        let p = call.req._player;
        let sklist = p.sk_active;
        let idx = call.req.idx - 1;
        let sk = sklist[idx];
        if (sklist.length <= 1) {
            call.error('技能数量不足');
            p.sendMessageg('Action', {
                template: MsgAction_1.template.文本消息,
                data: `[遗忘失败]自身技能只有一个啦！`,
                messageId: ''
            });
            return;
        }
        if (idx < 0 || idx >= sklist.length || !sk) {
            call.error('技能不存在');
            p.sendMessageg('Action', {
                template: MsgAction_1.template.文本消息,
                data: `[遗忘失败]ID.${idx + 1}:技能不存在或技能非自身技能`,
                messageId: ''
            });
            return;
        }
        p.rm_skill(idx);
        call.succ({});
    });
}
exports.default = default_1;
