import { ApiCall } from "tsrpc";
import { ReqMiss, ResMiss } from "../../shared/master/PtlMiss";
import { template } from "../../shared/master/MsgAction";

export default async function (call: ApiCall<ReqMiss, ResMiss>) {
    call.conn.sendMsg('Action', {
        template:template.测试,
        messageId:call.req._messageid,
    })
    call.succ({});
}