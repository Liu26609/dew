import { ApiCall } from "tsrpc";
import { ReqRename, ResRename } from "../../../../shared/master/player/skill/PtlRename";
import { player } from "../../../lib/unity/player";
import { template } from "../../../../shared/master/MsgAction";

export default async function (call: ApiCall<ReqRename, ResRename>) {
    let p = call.req._player as player;
    let name = call.req.rename;
    if (!name || name.length < 1) {
        p.sendMessageg('Action',{
            template:template.文本消息,
            data:`名字不能为空`,
            messageId:''
        })
        return
    }
    if (name.length > 10) {
        p.sendMessageg('Action',{
            template:template.文本消息,
            data:`名字不能超过10个字符`,
            messageId:''
        })
        return
    }
    // 不能包含换行符号
 
    if (name.includes('as') || name.includes('/') || name.includes('@at') || name.includes('<') || name.includes('>') || name.includes('\\')) {
        p.sendMessageg('Action', {
            template: template.文本消息,
            data: `名字不能包含系统保留字`,
            messageId: ''
        });
        return;
    }
    if (name.includes(' ')) {
        p.sendMessageg('Action',{
            template:template.文本消息,
            data:`名字不能包含空格`,
            messageId:''
        })
        return
    }
    let list = p.get_skill_all();
    let idx = call.req.idx - 1;
    let sk = list[idx];
    if (idx < 0 || idx >= list.length || !sk) {
        p.sendMessageg('Action',{
            template:template.文本消息,
            data:`[改名失败]ID.${idx + 1}:技能不存在`,
            messageId:''
        })
        call.error('技能不存在');
        return;
    }
    sk.set_rename(name);
    call.succ({});
}