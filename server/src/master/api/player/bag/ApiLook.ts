import { ApiCall } from "tsrpc";
import { ReqLook, ResLook } from "../../../../shared/master/player/bag/PtlLook";
import { player } from "../../../lib/unity/player";
import { bag_getType, Item_Type, prop_item_equip, prop_item_skill } from "../../../../shared/PtlFace";
import { SKILL } from "../../../lib/skill/SKILL";
import xlsxToJson from "../../../../model/xlsxToJson";

export default async function (call: ApiCall<ReqLook, ResLook>) {
    let p = call.req._player as player;
    let bag = p.bag;
    let item = bag.get_item(bag_getType.index, call.req.idx - 1);

    if (!item) {
        call.error('没有这个物品');
        return;
    }

    // let list = xlsxToJson.cfg.get('装备模板表') as Map<string, any>;
    // let info = list.get(item.data.id)
    let temp: any;

    switch (item.type) {
        case Item_Type.装备:
            temp = {
                name: item.name,
                att: item.data.attList,
                sys: item.data.sys,
                leve_strengthen: item.data.leve_strengthen,
                tips: '还没有写描述功能哦'
            } as prop_item_equip;
            break;
        case Item_Type.技能书:
            let skData = new SKILL(item.data);
            let sk: prop_item_skill = {
                name: skData.get_name(),
                cd: skData.cd,
                type: skData.type,
                desc: skData.desc
            }
            temp = sk
            break;
        case Item_Type.道具:
            let info = xlsxToJson.cfg.get('道具表')?.get(item.name)
            temp = {
                name: item.name,
                desc: info.desc || '还没有写描述功能哦'
            }
            break;
        default:
            break;
    }

    call.succ({
        type: item.type,
        temp: temp
    })
}