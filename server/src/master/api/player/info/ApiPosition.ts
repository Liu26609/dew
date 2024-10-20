import { ApiCall } from "tsrpc";
import { ReqPosition, ResPosition } from "../../../../shared/master/player/info/PtlPosition";
import { player } from "../../../lib/unity/player";

export default async function (call: ApiCall<ReqPosition, ResPosition>) {
    let p = call.req._player as player;
    let map = p.getMap();
    call.succ({
        name: map.name,
        online:map.get_playerCont(),
        pgs:map.get_pgs(p.id)
    })
}