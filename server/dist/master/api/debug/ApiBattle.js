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
const FACE_BODY_1 = require("../../lib/face/FACE_BODY");
const test_battle_1 = require("../../lib/battle/test.battle");
const battle_1 = require("../../lib/battle/battle");
function default_1(call) {
    return __awaiter(this, void 0, void 0, function* () {
        let t = new test_battle_1.test_battle();
        let a = t.create_unity();
        let b = t.create_unity();
        let c = new battle_1.battle();
        c.join(FACE_BODY_1.battle_group.主场, a);
        c.join(FACE_BODY_1.battle_group.客场, b);
        c.join(FACE_BODY_1.battle_group.客场, t.create_unity());
        c.join(FACE_BODY_1.battle_group.客场, t.create_unity());
        let ls = {
            game_over: (b) => {
                let log = b.get_log(a.get_group());
                let data = {
                    title: "战斗结束",
                    tips: `测试快速战斗已经结束`,
                    round: b.round,
                    skLog: log.skLog,
                    dataLog: log.dataLog,
                    killLog: log.killLog,
                    gitfs: [{ name: '金币', cont: 1 }],
                };
                call.succ({ data: data });
            }
        };
        a.set_battleLs(ls);
        c.start();
    });
}
exports.default = default_1;
