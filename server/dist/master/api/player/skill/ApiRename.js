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
        let name = call.req.rename;
        if (!name || name.length < 1) {
            p.sendMessageg('Action', {
                template: MsgAction_1.template.文本消息,
                data: `名字不能为空`,
                messageId: ''
            });
            return;
        }
        if (name.length > 10) {
            p.sendMessageg('Action', {
                template: MsgAction_1.template.文本消息,
                data: `名字不能超过10个字符`,
                messageId: ''
            });
            return;
        }
        // 不能包含换行符号
        if (name.includes('as') || name.includes('/') || name.includes('@at') || name.includes('<') || name.includes('>') || name.includes('\\')) {
            p.sendMessageg('Action', {
                template: MsgAction_1.template.文本消息,
                data: `名字不能包含系统保留字`,
                messageId: ''
            });
            return;
        }
        if (name.includes(' ')) {
            p.sendMessageg('Action', {
                template: MsgAction_1.template.文本消息,
                data: `名字不能包含空格`,
                messageId: ''
            });
            return;
        }
        let list = p.get_skill_all(true);
        let idx = call.req.idx - 1;
        let sk = list[idx];
        if (idx < 0 || idx >= list.length || !sk) {
            p.sendMessageg('Action', {
                template: MsgAction_1.template.文本消息,
                data: `[改名失败]ID.${idx + 1}:技能不存在`,
                messageId: ''
            });
            call.error('技能不存在');
            return;
        }
        sk.set_rename(name);
        call.succ({});
    });
}
exports.default = default_1;
