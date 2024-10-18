import { ApiCall } from "tsrpc";
import { ReqBattle, ResBattle } from "../../../shared/master/battle/PtlBattle";
import { player } from "../../lib/unity/player";
import { template } from "../../../shared/master/MsgAction";

export default async function (call: ApiCall<ReqBattle, ResBattle>) {
    // TODO
    let p = call.req._player as player;
    let b = p.get_battleCall();
    if(!b){
        p.sendMessageg('Action', {
            template:template.文本消息,
            messageId: "",
            data:'你目前没有战斗需要开始哦~'
        })
    }else{
        b.start();
    }
    call.succ({});
}