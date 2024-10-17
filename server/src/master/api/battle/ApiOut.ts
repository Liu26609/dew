import { ApiCall } from "tsrpc";
import { ReqOut, ResOut } from "../../../shared/master/battle/PtlOut";
import ET, { ET_K } from "../../lib/ET";
import { player } from "../../lib/unity/player";

export default async function (call: ApiCall<ReqOut, ResOut>) {
    let p = call.req._player as player;
    let bt = p.get_battle();
    if (bt) {
        bt.leave(p);
    }
    call.succ({});
}