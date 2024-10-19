import { ApiCall } from "tsrpc";
import { ReqPvp, ResPvp } from "../../../shared/master/debug/PtlPvp";
import { battle_group } from "../../lib/face/FACE_BODY";
import { battle } from "../../lib/battle/battle";
import { test_battle } from "../../lib/battle/test.battle";
import { player } from "../../lib/unity/player";
import { MSG_BATTLELOG, template } from "../../../shared/master/MsgAction";

export default async function (call: ApiCall<ReqPvp, ResPvp>) {
    let t = new test_battle()

    let a = call.req._player as player;
    if(a.is_die()){
        a.resHp(99999)
    }
    let b = t.create_unity()
    let c = new battle(false)
    c.join(battle_group.主场, a)
    c.join(battle_group.客场, b)
    c.join(battle_group.客场, t.create_unity())
    c.join(battle_group.客场, t.create_unity())
    let ls = {
        rund: (b: battle) => {
            let log = b.get_round_log(a.get_group());
            let data:MSG_BATTLELOG = {
                title: "回合结束",
                tips: `PVP测试战斗第${b.round}回合结束`,
                round: b.round,
                skLog: log.skLog,
                dataLog: log.dataLog,
                killLog: log.killLog,
                gitfs: [{ name: '金币', cont: 1 }],
      
            }
            a.sendMessageg('Action', {
                template: template.战斗日志,
                messageId: "",
                data: data
            })
        },
        game_over: (b: battle) => {
            let log = b.get_log(a.get_group());
        }
    }
    a.set_battleLs(ls)
    // c.set_listen(ls)
    c.start()
    call.succ({})

}