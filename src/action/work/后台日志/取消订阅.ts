import APP from "../../../APP";
import message from "../../../trigger/message"

export default class {
    constructor(cls: message, ...data) {
        this.start(cls, ...data)
    }

    async start(cls: message, ...data) {
        console.log(cls);
        cls.send_v1(`已取消订阅预警消息${cls.get_name()}`);
        APP.follow_list.delete(cls.get_userId());
        // cls.send_v1(`${str}<button text="预警检查" type="input">再来一次</button>`)
    }


}