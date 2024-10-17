import { ApiCall } from "tsrpc";
import { ReqSetName, ResSetName } from "../../../../shared/master/player/info/PtlSetName";

export default async function (call: ApiCall<ReqSetName, ResSetName>) {
   let p = call.req._player;
   p.name = call.req.new;
   call.succ({});
}