import server from "../../../server";
import message from "../../../trigger/message";


export default class {
    constructor(cls: message, data: number) {
        this.start(cls);
    }

    async start(cls: message) {
        let req = await server.api('player/map/Out', {}, cls)
        if (!req) return;
        cls.addLine('🔵已回到主神空间')
        cls.send()
    }

}
