import server from "../server";
import message from "../trigger/message";

export default class {
    constructor(cls:message){
        server.api('get/Att',{},cls);
        cls.addLine('┏┄══✉️我的属性══━┄')
        cls.addLine('┃金币:0 vip:1')
        cls.addLine('┗━━━━━━━━━━━━┄')
        cls.send()
    }
}