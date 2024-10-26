import { ApiCall } from "tsrpc";
import { ReqSell_sys, ResSell_sys } from "../../../../shared/master/player/bag/PtlSell_sys";
import { player } from "../../../lib/unity/player";
import { bag_getType } from "../../../lib/unity/base/bags";
import { Item_Type } from "../../../../shared/PtlFace";
import { template } from "../../../../shared/master/MsgAction";
import xlsxToJson from "../../../../model/xlsxToJson";

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
    let value = 1;
    if (item.type === Item_Type.道具) {
        const itemConfig = xlsxToJson.cfg.get('道具表')?.get(item.name);
        if (itemConfig && itemConfig.value !== undefined) {
            value = itemConfig.value;
        }
    }
    let coin = value * sellCont;
    let sellCoin = coin * cont;
    p.addItem({name:'金币',cont:sellCoin,type:Item_Type.道具});

    p.sendMessageg('Action',{
        template:template.文本消息,
        data: `[出售成功]你已将${item.name}X${sellCont}出售至主神空间，获得${sellCoin}金币`,
        messageId:'',
        delaytime:1
    })
    call.succ({});
}