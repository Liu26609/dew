import APP from "../../../APP";
import message from "../../../trigger/message"

export default class {
    constructor(cls: message, ...data) {
        console.log('绑定信息', data)
        this.start(cls, ...data)
    }

    async start(cls: message, ...data) {
        APP.game_stock = false;
        cls.send_v1(`已关闭库存补偿`);
    }


}