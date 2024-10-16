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

    let ls = {
        game_over: (b: battle) => {
            let sklog = b.get_log()
            console.log('战斗结束', sklog)
            call.succ({ skLog: [sklog[battle_group.主场], sklog[battle_group.客场]] })

        }
    }
    c.start(ls)

}