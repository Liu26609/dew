import { ApiCall } from "tsrpc";
import { ReqOut, ResOut } from "../../../../shared/master/player/map/PtlOut";
import { player } from "../../../lib/unity/player";
import { template } from "../../../../shared/master/MsgAction";

export default async function (call: ApiCall<ReqOut, ResOut>) {
    let p = call.req._player as player;
    let map = p.getMap();
    if(map.name == '主神空间'){
        p.sendMessageg('Action',{
            template:template.文本消息,
            data:'不能在主神空间使用此功能',
            messageId:''
        })
        call.error('不能在主神空间使用此功能');
        return;
    }
    map.leave(p.id);
    call.succ({});
}