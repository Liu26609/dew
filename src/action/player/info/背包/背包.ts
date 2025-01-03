import server from "../../../../server";
import { Item_Type } from "../../../../shared/master/shareFace";
import temp_text from "../../../../temp/temp_text";
import message from "../../../../trigger/message";

export default class {
    constructor(cls: message, ...data) {
        console.log('背包', data)
        this.start(cls, ...data)
    }

    async start(cls: message, ...data) {
        if (!data || data.length == 0) {
            this.list(cls)
        } else if (data.length >= 1) {
            switch (data[0]) {
                case '查看':
                    this.look(cls, data[1])
                    break;
                case '使用':
                    this.use(cls, data[1], Number(data[2]) || 1)
                    break;
                case '出售':
                    this.sell(cls, data[1], Number(data[2]) || 1)
                    break;
                case '装备':
                    this.list(cls, Item_Type.装备)
                    break;
                case '技能':
                    this.list(cls, Item_Type.技能书)
                    break;
                case '道具':
                    this.list(cls, Item_Type.道具)
                    break;
                default:
                    this.list(cls)
                    break;
            }
        }
    }
    async sell(cls: message, idx: number, num: number = 1) {
        let req = await server.api('player/bag/Sell_sys', { idx: idx, cont: num }, cls);
        console.log('背包出售')
    }
    async use(cls: message, idx: number, num: number = 1) {
        let req = await server.api('player/bag/Use', { idx: idx, cont: num }, cls);
        console.log('背包使用')
    }
    async list(cls: message, filter?: Item_Type) {
        let req = await server.api('player/bag/List', { filter: filter }, cls);
        temp_text.bag_list(req, cls)
    }
    async look(cls: message, idx: number) {
        let req = await server.api('player/bag/Look', { idx: idx }, cls);
        temp_text.prop_look(req, cls)
    }
}