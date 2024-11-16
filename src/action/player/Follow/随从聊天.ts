import server from "../../../server";
import message from "../../../trigger/message"



export default class {
    constructor(cls: message, content: string) {
        this.start(cls, content);
    }

    async start(cls: message, content: string) {
       cls.send_v1('花里胡哨的的功能暂时不做')
    }
}