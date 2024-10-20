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
exports.default = default_1;
const FACE_BODY_1 = require("../../lib/face/FACE_BODY");
const battle_1 = require("../../lib/battle/battle");
const test_battle_1 = require("../../lib/battle/test.battle");
const MsgAction_1 = require("../../../shared/master/MsgAction");
function default_1(call) {
    return __awaiter(this, void 0, void 0, function* () {
        let t = new test_battle_1.test_battle();
        let a = call.req._player;
        if (a.is_die()) {
            a.resHp(99999);
        }
        let b = t.create_unity();
        let c = new battle_1.battle(false);
        c.join(FACE_BODY_1.battle_group.主场, a);
        c.join(FACE_BODY_1.battle_group.客场, b);
        c.join(FACE_BODY_1.battle_group.客场, t.create_unity());
        c.join(FACE_BODY_1.battle_group.客场, t.create_unity());
        let ls = {
            rund: (b) => {
                let log = b.get_round_log(a.get_group());
                let data = {
                    title: "回合结束",
                    tips: `PVP测试战斗第${b.round}回合结束`,
                    round: b.round,
                    skLog: log.skLog,
                    dataLog: log.dataLog,
                    killLog: log.killLog,
                    gitfs: [{ name: '金币', cont: 1 }],
                };
                a.sendMessageg('Action', {
                    template: MsgAction_1.template.战斗日志,
                    messageId: "",
                    data: data
                });
            },
            game_over: (b) => {
                let log = b.get_log(a.get_group());
            }
        };
        a.set_battleLs(ls);
        // c.set_listen(ls)
        c.start();
        call.succ({});
    });
}
