import { ApiCall } from "tsrpc";
import { ReqList, ResList } from "../../../../shared/master/player/skill/PtlList";
import { player } from "../../../lib/unity/player";

export default async function (call: ApiCall<ReqList, ResList>) {
    let p = call.req._player as player;
    let list = p.get_skill_all(true);

    let resList: { name: string }[] = [];
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        resList.push({
            name: element.get_name(),
        });
    }
    call.succ({
        list: resList
    });
}