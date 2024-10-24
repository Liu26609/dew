import { ApiCall } from "tsrpc";
import { ReqPing, ResPing } from "../../shared/tool/PtlPing";

export default async function (call: ApiCall<ReqPing, ResPing>) {
    // TODO
    console.log('tool ping')
    call.error('API Not Implemented');
}