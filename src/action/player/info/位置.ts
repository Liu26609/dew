import server from "../../../server";
import temp_text, { temp_card } from "../../../temp/temp_text";
import message from "../../../trigger/message"



export default class {
    constructor(cls: message) {
        this.init(cls);
    }

    async init(cls: message) {
        let req = await server.api('player/info/Position', {}, cls)
        if (!req) return;
        temp_text.temp_position(req, cls)
    }
}