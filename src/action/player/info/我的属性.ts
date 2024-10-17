import server from "../../../server";
import message from "../../../trigger/message";

export default class {
    constructor(cls:message){
        this.start(cls)
        
    }
    async start(cls: message) {
        let req = await server.api('player/info/GetBase',{},cls)
        cls.addLine('┏┄══✉️我的属性══━┄')
        cls.addLine('┃昵称:'+req.name)
        cls.addLine('┃金币:0 vip:1')
        cls.addLine('┗━━━━━━━━━━━━┄')
        cls.send()
    }
}