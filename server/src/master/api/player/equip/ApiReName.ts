import { ApiCall } from "tsrpc";
import { ReqReName, ResReName } from "../../../../shared/master/player/equip/PtlReName";
import { player } from "../../../lib/unity/player";

export default async function (call: ApiCall<ReqReName, ResReName>) {
    let p = call.req._player as player;
    let idx = call.req.idx;
    let rename = call.req.name;
    // rename 只能中英文和常规符号
    let reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
    if (!reg.test(rename)) {
        call.error('名字只能是中英文和常规符号')
        return;
    }
    let eq = p.equips[idx - 1];
    if(!eq){
        call.error('装备不存在')
        return;
    }
    eq.name = rename;
    call.succ({})
}