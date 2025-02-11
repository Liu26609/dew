import APP from "../../../APP";
import message from "../../../trigger/message"

export default class {
    constructor(cls: message, ...data) {
        console.log('绑定信息', data)
        this.start(cls, ...data)
    }

    async start(cls: message, ...data) {
        let fix =  await APP.task_1();
        cls.send_v1(fix || '补偿已关闭');
    }


}