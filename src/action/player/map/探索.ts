import server from "../../../server";
import message from "../../../trigger/message";



export default class {
    constructor(cls: message) {
        this.init(cls);
    }

    async init(cls: message) {
       server.api('player/map/Search', {}, cls)
    }
}
