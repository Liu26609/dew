import { ApiCall } from "tsrpc";
import { ReqGetBase, ResGetBase } from "../../../../shared/master/player/info/PtlGetBase";
import { player } from "../../../lib/unity/player";

export default async function (call: ApiCall<ReqGetBase, ResGetBase>) {
    let p = call.req._player as player;
    // 获取对应体系的文字转换
    
    call.succ({
        name:p.name,
        sys:p.sys,
        className:p.get_className(),
        att:p.attList
    });
}