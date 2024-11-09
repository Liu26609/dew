import server from "../../server";
import temp_img from "../../temp/temp_img";
import { temp_card } from "../../temp/temp_text";
import message from "../../trigger/message";
import APP from "../../APP";
import common from "../../lib/common";

export default class {
    constructor(cls: message){
        this.start(cls);
    }

    async start(cls: message){
        let req = await server.api('shop/equip/Look',{},cls)
        if(!req) return;
        temp_img.temp_prop_equip(req.data,cls)
        
        // 显示商店信息
        let temp = new temp_card();
        temp.set_title('装备商店', '📖')
        temp.add(`🎯${req.data.name}`)
        temp.add(`📦剩余库存: ${req.stock}`)
        temp.add(`⏰刷新时间: ${APP.countdown(req.down_time - Date.now())}`)
        temp.add(`💰价格:${req.price.name}*${req.price.cont}`)
        temp.add(`💡购买指令[装备购买]`)
        temp.add(`↓↓↓↓装备预览图↓↓↓↓`)
        cls.send_v2(temp)
    }
}0