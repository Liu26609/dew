import { ApiCall } from "tsrpc";
import { ReqCheck, ResCheck } from "../../shared/server_mail/PtlCheck";

export default async function (call: ApiCall<ReqCheck, ResCheck>) {
    // TODO
    call.error('API Not Implemented');
}