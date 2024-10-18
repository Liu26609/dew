import server from "../../../server";
import message from "../../../trigger/message"



export default class {
    constructor(cls: message) {
        this.init(cls);
    }

    async init(cls: message) {
        let req = await server.api('player/info/Position',{},cls)
        if(!req)return;
        cls.addLine('┏┄══✉️我的位置══━┄')
        cls.addLine('┃当前世界:' + req.name)
        cls.addLine('┃世界玩家:' + req.online)
        cls.addLine('┗━━━━━━━━━━━━┄')
        cls.send()
    }
}