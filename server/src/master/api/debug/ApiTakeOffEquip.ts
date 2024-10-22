import { ApiCall } from "tsrpc";
import { ReqTakeOffEquip, ResTakeOffEquip } from "../../../shared/master/debug/PtlTakeOffEquip";
import { player } from "../../lib/unity/player";

export default async function (call: ApiCall<ReqTakeOffEquip, ResTakeOffEquip>) {
    let p = call.req._player as player;
    p.takeOffEquip(0);
    call.succ({})
}