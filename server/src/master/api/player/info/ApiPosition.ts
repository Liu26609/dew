import { ApiCall } from "tsrpc";
import { ReqPosition, ResPosition } from "../../../../shared/master/player/info/PtlPosition";
import { player } from "../../../lib/unity/player";
import word from "../../../lib/word";

export default async function (call: ApiCall<ReqPosition, ResPosition>) {
    let p = call.req._player as player;
    let id = p.get_mapid();
    let map = word.getMap(id);

    call.succ({
        name: map.name,
        online:map.get_playerCont()
    })
}