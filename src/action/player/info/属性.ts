import server from "../../../server";
import message from "../../../trigger/message";

export default class {
    constructor(cls: message) {
        this.start(cls)

    }
    async start(cls: message) {
        let req = await server.api('player/info/GetBase', {}, cls)
        if(!req)return;
        cls.addLine('┏┄══✉️我的属性══━┄')
        cls.addLine('┃昵称:' + req.name)
        let attList = req.att;
        for (let i = 0; i < attList.length; i++) {
            const att = attList[i];
            switch (att.t) {
                case 'body_bar':
                    cls.addLine(`┃${att.name}:${att.now}/${att.max}`)
                    break;
                case 'att_val':
                    cls.addLine(`┃${att.name}:${att.val}`)
                    break;
                default:
                    cls.addLine('┃未知属性类型:' + att.t)
                    break;
            }
        }

        cls.addLine('┗━━━━━━━━━━━━┄')
        cls.send()
    }
}