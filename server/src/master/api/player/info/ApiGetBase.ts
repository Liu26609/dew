import { ApiCall } from "tsrpc";
import { ReqGetBase, ResGetBase } from "../../../../shared/master/player/info/PtlGetBase";
import { player } from "../../../lib/unity/player";

export default async function (call: ApiCall<ReqGetBase, ResGetBase>) {
    let p = call.req._player as player;
    call.succ({
        name:p.name
    });
}