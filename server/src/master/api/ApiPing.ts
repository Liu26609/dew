import { ApiCall } from "tsrpc";
import { ReqPing, ResPing } from "../../shared/master/PtlPing";

export default async function (call: ApiCall<ReqPing, ResPing>) {
    console.log('---ping')
    call.succ({})
}