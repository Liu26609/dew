import { ApiCall } from "tsrpc";
import { ReqLook, ResLook } from "../../../../shared/master/player/skill/PtlLook";
import { player } from "../../../lib/unity/player";
import { template } from "../../../../shared/master/MsgAction";

export default async function (call: ApiCall<ReqLook, ResLook>) {
    let p = call.req._player as player;
    let list = p.get_skill_all();
    let idx = call.req.idx - 1;
    let sk = list[idx];
    if (!sk) {
        call.error('技能不存在');
        p.sendMessageg('Action', {
            template: template.文本消息,
            data: `[查看失败]ID.${idx + 1}:技能不存在`,
            messageId: ''
        });
        return;
    }
    call.succ({
        name: sk.get_name(),
        cd: sk.cd,
        type: sk.type,
        desc: sk.desc
    });
}