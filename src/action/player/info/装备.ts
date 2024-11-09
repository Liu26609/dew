import APP from "../../../APP";
import server from "../../../server";
import temp_img from "../../../temp/temp_img";
import temp_text, { temp_card } from "../../../temp/temp_text";
import message from "../../../trigger/message"



export default class {
    constructor(cls: message, ...data) {
        console.log('装备', data)
        this.start(cls, ...data)
    }

    async start(cls: message, ...data) {
        if (!data || data.length == 0) {
            this.list(cls)
        } else if (data.length >= 1) {
            switch (data[0]) {
                case '卸下':
                    this.takeOff(cls, data[1])
                    break;
                case '改名':
                    this.rename(cls, data[1],data[2])
                    break;
                case '查看':
                    this.look(cls, data[1])
                    break;
                case '强化':
                    this.strengthen(cls, data[1])
                    break;
                default:
                    this.list(cls)
                    break;
            }
        }
    }
    async strengthen(cls: message,idx:number){
        let req = await server.api('player/equip/Strengthen',{idx:idx,from:'equip'},cls)
        if (!req) return;
    }
    async rename(cls:message,idx:number,rename:string){
        let req = await server.api('player/equip/ReName',{idx:idx,name:rename},cls)
        if (!req) return;
        cls.addLine(`装备改名完成`)
        cls.send()
    }
    async takeOff(cls: message, idx: number) {
        let req = await server.api('player/equip/TakeOff', { idx: idx }, cls);
        if (!req) return;
    }
    async look(cls: message,idx:number) {
        let req = await server.api('player/equip/Look',{idx:idx},cls)
        if(!req)return
        let card = await temp_text.temp_prop_equip(req)
        card.set_title_line('可选操作','🔧')
        card.add(`【装备强化 ${idx}】【装备卸下 ${idx}】`)
        cls.send_v2(card)

        temp_img.temp_prop_equip(req,cls)
    }
    async list(cls: message) {
        // 查看血统
        let req = await server.api('player/equip/List', {}, cls)
        if (!req) return;
        let list = req.list;
        let temp = new temp_card()
        let useCont = 0;
        temp.set_title('我的装备', '🧙')
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            if (!element) {
                continue;
            }
            useCont += 1;
            temp.add(`[${i + 1}]${element.type}·${element.name}`)
        }
        if (!useCont) {
            temp.line(`你身上还没有一件装备呢~`)
        }
        cls.send_v2(temp)
    }
}