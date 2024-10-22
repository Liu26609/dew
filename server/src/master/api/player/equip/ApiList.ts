import { ApiCall } from "tsrpc";
import { ReqList, ResList } from "../../../../shared/master/player/equip/PtlList";
import { player } from "../../../lib/unity/player";

export default async function (call: ApiCall<ReqList, ResList>) {
    let p = call.req._player as player;
    let equips = p.equips;
    let req: ({ name: string, type: string } | undefined)[] = [];
    for (let i = 0; i < equips.length; i++) {
        const element = equips[i];
        if (!element) {
            req.push(undefined);
            continue;
        }
        req.push({
            name: element.name,
            type: "法宝"
        })
    }
    call.succ({list:req})
}