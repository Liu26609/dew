import { ApiCall } from "tsrpc";
import { ReqSell_sys, ResSell_sys } from "../../../../shared/master/player/bag/PtlSell_sys";
import { player } from "../../../lib/unity/player";
import { bag_getType } from "../../../lib/unity/base/bags";
import { Item_Type } from "../../../../shared/PtlFace";

export default async function (call: ApiCall<ReqSell_sys, ResSell_sys>) {
    let p = call.req._player as player;
    let bag = p.bag;
    let idx = call.req.idx - 1;
    let cont = call.req.cont;
    let item = bag.get_item(bag_getType.index, idx);
    if (!item) {
        call.error('背包中没有ID为' + idx + '的物品');
        return;
    }
    let sellCont = item.cont >= cont ? cont : item.cont;
    // 假设道具价值100
    let coin = 100 * sellCont;
    let sellCoin = coin * cont;
    // TODO：当前工作
    p.addItem({name:'金币',cont:coin,type:Item_Type.道具});

}