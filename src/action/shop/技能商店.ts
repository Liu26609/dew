import server from "../../server";
import temp_img from "../../temp/temp_img";
import { temp_card } from "../../temp/temp_text";
import message from "../../trigger/message";
import APP from "../../APP";

export default class {
    constructor(cls: message){
        this.start(cls);
    }

    async start(cls: message){
        let req = await server.api('shop/skill/Look',{},cls)
        if(!req) return;
        
        // 渲染技能图片
        const data = {
            name: req.data.name,
            sk_type: req.data.type,
            cd: req.data.cd,
            desc: req.data.desc,
            leve: {
                num: req.data.leve,
                bar: '0%'
            }
        };
        temp_img.render(cls, 'skill', data)
        
        // 显示商店信息
        let temp = new temp_card();
        temp.set_title('技能商店', '📖')
        temp.add(`🎯${req.data.name}`)
        temp.add(`📦剩余库存: ${req.stock}`)
        temp.add(`⏰刷新时间: ${APP.countdown(req.down_time - Date.now())}`)
        temp.add(`💰价格:${req.price.name}*${req.price.cont}`)
        temp.add(`💡购买指令[技能购买]`)
        cls.send_v2(temp)
    }
}