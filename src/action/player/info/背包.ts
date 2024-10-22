import server from "../../../server";
import temp_text from "../../../temp/temp_text";
import message from "../../../trigger/message";

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
                default:
                    this.list(cls)
                    break;
            }
        }
    }
    async list(cls: message) {
        let req = await server.api('player/bag/List', {}, cls);
        temp_text.bag_list(req, cls)
    }
    async look(cls: message, idx: number) {
        let req = await server.api('player/bag/Look', { idx: idx }, cls);
        temp_text.prop_look(req, cls)
    }
}