import { ApiCall } from "tsrpc";
import { ReqSend, ResSend } from "../../shared/server_mail/PtlSend";
import manage_mail from "../model/manage_mail";

export default async function (call: ApiCall<ReqSend, ResSend>) {
   let item = call.req.data;
   manage_mail.send(item)
   call.succ({})
}