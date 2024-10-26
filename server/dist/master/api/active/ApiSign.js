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
const sign_1 = __importDefault(require("../../manage/sign"));
const MsgAction_1 = require("../../../shared/master/MsgAction");
const PtlFace_1 = require("../../../shared/PtlFace");
function default_1(call) {
    return __awaiter(this, void 0, void 0, function* () {
        let p = call.req._player;
        let cls = yield sign_1.default.sign(p.id);
        if (!cls) {
            p.sendMessageg('Action', {
                template: MsgAction_1.template.文本消息,
                messageId: "",
                data: '今日已经签到过啦~'
            });
            call.error('今日已经签到过了');
            return;
        }
        let gitfs = [
            { name: '金币', cont: 1, type: PtlFace_1.Item_Type.道具 },
            { name: '强化石', cont: 99, type: PtlFace_1.Item_Type.道具 },
        ];
        // 签到成功
        // 奖励
        call.succ({
            consecutive_sign_count: cls.consecutive_sign_count,
            sign_count: cls.sign_count,
            todayRank: cls.todayRank,
            gitfs: gitfs
        });
        p.addItem(gitfs);
    });
}
exports.default = default_1;
