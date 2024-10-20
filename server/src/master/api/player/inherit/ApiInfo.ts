import { ApiCall } from "tsrpc";
import { ReqInfo, ResInfo } from "../../../../shared/master/player/inherit/PtlInfo";
import { player } from "../../../lib/unity/player";

export default async function (call: ApiCall<ReqInfo, ResInfo>) {
    let p = call.req._player as player;
    let inherit = p.inherit;
    let info = inherit.get_info()
    let skills = inherit.sk_active.map(skill => skill.get_name());

    let att = inherit.attList;

    call.succ({
        name: info.name,
        from: info.from,
        skills: skills,
        sys:info.sys,
        att: att
    })
}