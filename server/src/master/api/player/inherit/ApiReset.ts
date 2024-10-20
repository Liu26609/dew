import { ApiCall } from "tsrpc";
import { ReqReset, ResReset } from "../../../../shared/master/player/inherit/PtlReset";
import { player } from "../../../lib/unity/player";

export default async function (call: ApiCall<ReqReset, ResReset>) {
    let p = call.req._player as player;
    p.inherit.reset();
    call.succ({})
}