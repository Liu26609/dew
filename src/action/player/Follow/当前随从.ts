import server from "../../../server";
import message from "../../../trigger/message"



export default class {
    constructor(cls: message) {
        this.start(cls);
    }

    async start(cls: message) {
        server.api('player/follow/Look', {}, cls)
    }
}