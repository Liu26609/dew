import { ApiCall } from "tsrpc";
import { ReqBattle, ResBattle } from "../../../shared/master/debug/PtlBattle";
import { battle_group } from "../../lib/face/FACE_BODY";
import { test_battle } from "../../lib/battle/test.battle";
import { battle } from "../../lib/battle/battle";
import { MSG_BATTLELOG } from "../../../shared/master/MsgAction";

export default async function (call: ApiCall<ReqBattle, ResBattle>) {


    let t = new test_battle()

    let a = call.req._player
    let b = t.create_unity()
    let c = new battle()
    c.join(battle_group.主场, a)
    c.join(battle_group.客场, b)
    c.join(battle_group.客场, t.create_unity())
    c.join(battle_group.客场, t.create_unity())
    let ls = {
        game_over: (b: battle) => {
            let log = b.get_log(a.get_group());
            let data: MSG_BATTLELOG = {
                title: "战斗结束",
                tips: `测试快速战斗已经结束`,
                round: b.round,
                skLog: log.skLog,
                dataLog: log.dataLog,
                killLog: log.killLog,
                gitfs: [{ name: '金币', cont: 1 }],

            }
            call.succ({data:data})
        }
    }
    a.set_battleLs(ls)
    c.start()

}