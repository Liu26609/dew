import { ApiCall } from "tsrpc";
import { ReqCancel, ResCancel } from "../../../shared/master/transaction/PtlCancel";
import transaction from "../../lib/transaction";

export default async function (call: ApiCall<ReqCancel, ResCancel>) {
    let p = call.req._player;
    transaction.cancel(p,'玩家主动取消订单');
    call.succ({});
}