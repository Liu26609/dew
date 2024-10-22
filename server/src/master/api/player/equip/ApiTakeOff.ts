import { ApiCall } from "tsrpc";
import { ReqTakeOff, ResTakeOff } from "../../../../shared/master/player/equip/PtlTakeOff";
import { player } from "../../../lib/unity/player";

export default async function (call: ApiCall<ReqTakeOff, ResTakeOff>) {
   let p = call.req._player as player;
   p.takeOffEquip(call.req.idx - 1);
   call.succ({})
}