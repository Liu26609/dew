import message from "../../../trigger/message";

export default class {
    constructor(cls: message, ...data) {
        this.start(cls, ...data)
    }
    start(cls: message, ...data) {
        cls.send_v1('开发中功能')
    }
}