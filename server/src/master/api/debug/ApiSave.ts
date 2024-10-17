import { ApiCall } from "tsrpc";
import { ReqSave, ResSave } from "../../../shared/master/debug/PtlSave";
import user from "../../manage/user";

export default async function (call: ApiCall<ReqSave, ResSave>) {
    await user.save(call.req._player.id);
    user.sqHas(call.req._player.id);
    call.succ({});
}