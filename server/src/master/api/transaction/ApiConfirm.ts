import { ApiCall } from "tsrpc";
import { ReqConfirm, ResConfirm } from "../../../shared/master/transaction/PtlConfirm";
import transaction from "../../lib/transaction";

export default async function (call: ApiCall<ReqConfirm, ResConfirm>) {
    let p = call.req._player;
    transaction.confirm(p,p.id);
    call.succ({});
}