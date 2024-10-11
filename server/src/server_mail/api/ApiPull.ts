import { ApiCall } from "tsrpc";
import { ReqPull, ResPull } from "../../shared/server_mail/PtlPull";
import manage_mail from "../model/manage_mail";

export default async function (call: ApiCall<ReqPull, ResPull>) {
    let list = await manage_mail.pull(call.req.uuid,call.req.dev)
    call.succ({list:list,dev:manage_mail.sysDev})
}