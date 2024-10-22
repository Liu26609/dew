import { ApiCall } from "tsrpc";
import { ReqRm, ResRm } from "../../../../shared/master/player/skill/PtlRm";
import { player } from "../../../lib/unity/player";
import { template } from "../../../../shared/master/MsgAction";

export default async function (call: ApiCall<ReqRm, ResRm>) {
    let p = call.req._player as player;
    let sklist = p.sk_active;
    let idx = call.req.idx - 1;
    let sk = sklist[idx];
    if(sklist.length <= 1){
        call.error('技能数量不足');
        p.sendMessageg('Action', {
            template: template.文本消息,
            data: `[遗忘失败]自身技能只有一个啦！`,
            messageId: ''
        });
        return;
    }
    if (idx < 0 || idx >= sklist.length || !sk) {
        call.error('技能不存在');
        p.sendMessageg('Action', {
            template: template.文本消息,
            data: `[遗忘失败]ID.${idx + 1}:技能不存在或技能非自身技能`,
            messageId: ''
        });
        return;
    }
    p.rm_skill(idx);
    call.succ({});
}