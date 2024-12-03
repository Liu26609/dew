import server from "../../../server";
import message from "../../../trigger/message";


export default class {
    constructor(cls: message, data: number) {
        this.start(cls);
    }

    async start(cls: message) {
        await server.api('player/map/Out', {}, cls)
    }

}
