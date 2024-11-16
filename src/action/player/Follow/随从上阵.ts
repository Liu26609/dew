import server from "../../../server";
import message from "../../../trigger/message";


export default class {
    constructor(cls: message, ...data) {
        this.start(cls, ...data);
    }
    start(cls: message, ...data) {
        if (!data || data.length == 0) {
            this.menu(cls)
            return;
        }
        let idx = Number(data[0])
        this.select(cls, idx);

    }
    select(cls: message, idx: number) {
        server.api('player/follow/Up', { idx: idx }, cls)
    }

    menu(cls: message) {
        cls.send_v1('请选择上阵的随从[随从上阵 + ID]')
    }
}