import { ApiCall } from "tsrpc";
import { ReqUse, ResUse } from "../../../../shared/master/player/bag/PtlUse";
import { player } from "../../../lib/unity/player";
import { bag_getType } from "../../../lib/unity/base/bags";
import { template } from "../../../../shared/master/MsgAction";

export default async function (call: ApiCall<ReqUse, ResUse>) {
    let p = call.req._player as player;
    let bag = p.bag;

    if(!bag.items[call.req.idx-1]){
        p.sendMessageg('Action',{
            template:template.文本消息,
            data:`[使用失败]背包中没有ID为${call.req.idx}的物品`,
            messageId:''
        })
        call.error(`背包中没有ID为${call.req.idx}的物品`);
        return;
    }

    bag.useItem(bag_getType.index, call.req.idx - 1, call.req.cont);

    call.succ({})
}