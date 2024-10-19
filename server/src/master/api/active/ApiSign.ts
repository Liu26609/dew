import { ApiCall } from "tsrpc";
import { ReqSign, ResSign } from "../../../shared/master/active/PtlSign";
import sign from "../../manage/sign";
import { player } from "../../lib/unity/player";
import { template } from "../../../shared/master/MsgAction";
import { Item_Type } from "../../../shared/shareFace";
export default async function (call: ApiCall<ReqSign, ResSign>) {
    let p = call.req._player as player;
    let cls =  await sign.sign(p.id);
    if(!cls){
        p.sendMessageg('Action', {
            template:template.文本消息,
            messageId: "",
            data:'今日已经签到过啦~'
        })
        call.error('今日已经签到过了');
        return;
    }
    let gitfs = [{ name: '金币', cont: 1,type:Item_Type.道具 }]
    // 签到成功
    // 奖励
    call.succ({
        consecutive_sign_count: cls.consecutive_sign_count,
        sign_count: cls.sign_count,
        todayRank: cls.todayRank,
        gitfs:gitfs
    });
    p.addItem(gitfs);
}