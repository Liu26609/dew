import { ApiCall } from "tsrpc";
import { ReqList, ResList } from "../../../../shared/master/player/bag/PtlList";
import { player } from "../../../lib/unity/player";

export default async function (call: ApiCall<ReqList, ResList>) {
    let p = call.req._player as player;
    let list = p.bag.items;

    let req: { name: string, cont: number }[] = [];
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        req.push({ name: element.name, cont: element.cont || 0 });
    }
    call.succ({
        list: req
    })
}