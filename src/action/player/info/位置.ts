import server from "../../../server";
import message from "../../../trigger/message"



export default class {
    constructor(cls: message) {
        this.init(cls);
    }

    async init(cls: message) {
        let req = await server.api('player/info/Position', {}, cls)
        if (!req) return;
        switch (req.name) {
            case '主神空间':
                cls.addLine('┏┄══✉️主神空间══━┄')
                cls.addLine('┃世界玩家:' + req.online)
                cls.addLine('┗━━━━━━━━━━━━┄')
                break;

            default:
                cls.addLine('┏┄══✉️我的位置══━┄')
                cls.addLine('┃当前世界:' + req.name)
                cls.addLine('┃世界玩家:' + req.online)
                cls.addLine('┃探索进度:' + req.pgs + '%')
                cls.addLine('┗━━━━━━━━━━━━┄')
                break;
        }
        cls.send()
    }
}