import { ApiCall } from "tsrpc";
import { ReqStrengthen, ResStrengthen } from "../../../../shared/master/player/equip/PtlStrengthen";
import { player } from "../../../lib/unity/player";
import { bag_getType, Item_Type } from "../../../../shared/PtlFace";
import transaction from "../../../lib/transaction";
import { template } from "../../../../shared/master/MsgAction";
import equip from "../../../lib/unity/base/equip";
import common from "../../../lib/common";

export default async function (call: ApiCall<ReqStrengthen, ResStrengthen>) {
    let p = call.req._player as player;
    let from = call.req.from;
    let idx = call.req.idx - 1;
    if (idx < 0) {
        call.error('强化索引错误');
        return;
    }
    let item: any = undefined;
    switch (from) {
        case 'bag':
            let bag_item = p.bag.get_item(bag_getType.index, idx);
            if (!bag_item) {
                call.error('背包 - 装备不存在');
                return;
            }
            if (bag_item.type != Item_Type.装备) {
                call.error('背包 - 类型错误');
                return;
            }
            item = bag_item.data as equip;
            break;
        case 'equip':
            if (!p.equips[idx]) {
                call.error('装备栏 - 装备不存在');
                return;
            }
            item = p.equips[idx];
            break;
        default:
            console.error('强化来源错误')
            break;
    }
    if (item === undefined) {
        call.error('装备不存在');
        return;
    }
    // 成功率计算  100% - (强化等级/10) * 10% + 强化等级%

  
    // 强化逻辑
    transaction.create(p, `强化装备:${item.name}`, [{ name: '强化石', cont: 0 }])
        .then(() => {
            let msgArry:string[] = []
            let succ_rate = 100 - (item.leve_strengthen.now / 20) * item.leve_strengthen.now - item.leve_strengthen.now;
            msgArry.push(`强化开始...成功率${succ_rate.toFixed(2)}%`)
            if(succ_rate < 1){
                succ_rate = Math.max(succ_rate,common.random(1,1 + (100 - item.leve_strengthen.now) / 100))
                msgArry.push(`成功率过低,开始额外补偿成功率${succ_rate.toFixed(2)}%`)
                msgArry.push(`补偿完成:成功率${succ_rate.toFixed(2)}%`)
            }
            item.leve_strengthen.now += 1;
            p.sendMessageg('Action', {
                template: template.纯文字,
                data: msgArry,
                messageId: '',
                delaytime:1
            })
            p.sendMessageg('Action', {
                template: template.文本消息,
                data: `🎉强化成功!当前强化等级${item.leve_strengthen.now}`,
                messageId: '',
                delaytime:1 * msgArry.length + 2
            })
        })
    call.succ({});
}