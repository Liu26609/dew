import { ApiCall } from "tsrpc";
import { ReqUpequip, ResUpequip } from "../../../shared/master/debug/PtlUpequip";
import { player } from "../../lib/unity/player";
import equip from "../../lib/unity/base/equip";

export default async function (call: ApiCall<ReqUpequip, ResUpequip>) {
    let p = call.req._player as player;

    p.wearEquip(new equip({id:'1',sys:'修仙'}))
    
    call.succ({})
}