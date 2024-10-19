import server from "../../../server";
export default class {
    constructor(cls) {
        this.init(cls);
    }
    async init(cls) {
        let req = await server.api('player/info/Position', {}, cls);
        if (!req)
            return;
        cls.addLine('┏┄══✉️我的位置══━┄');
        cls.addLine('┃当前世界:' + req.name);
        cls.addLine('┃世界玩家:' + req.online);
        cls.addLine('┗━━━━━━━━━━━━┄');
        cls.send();
    }
}
