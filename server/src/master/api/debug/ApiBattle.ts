import { ApiCall } from "tsrpc";
import { ReqBattle, ResBattle } from "../../../shared/master/debug/PtlBattle";
import { battle_group } from "../../lib/face/FACE_BODY";
import { test_battle } from "../../lib/battle/test.battle";
import { battle } from "../../lib/battle/battle";

export default async function (call: ApiCall<ReqBattle, ResBattle>) {


    let t = new test_battle()

    let a = t.create_unity()
    let b = t.create_unity()
    let c = new battle()
    c.join(battle_group.主场, a)
    c.join(battle_group.客场, b)
    c.join(battle_group.客场, t.create_unity())
    c.join(battle_group.客场, t.create_unity())
    let ls = {
        game_over: (b: battle) => {
            let sklog = b.get_log()
            let dataLog = b.get_dataLog()
            console.log('战斗结束', sklog)
            call.succ({
                round: b.round,
                skLog: [sklog[battle_group.主场], sklog[battle_group.客场]],
                dataLog: [dataLog[battle_group.主场], dataLog[battle_group.客场]],
                killLog: b.get_killlog(),
                gitfs:[{name:'金币',cont:1}]
            })
            call.req._player.addItem('金币',99)
        }
    }
    c.start(ls)

}