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
        let map = p.getMap();
        if (map.name == '主神空间') {
            p.sendMessageg('Action', {
                template: MsgAction_1.template.文本消息,
                data: '不能在主神空间使用此功能',
                messageId: ''
            });
            call.error('不能在主神空间使用此功能');
            return;
        }
        map.leave(p.id);
        call.succ({});
    });
}
exports.default = default_1;
