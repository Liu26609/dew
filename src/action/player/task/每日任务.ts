import server from "../../../server";
import temp_text from "../../../temp/temp_text";
import message from "../../../trigger/message";

export default class {
    constructor(cls: message, data: number) {
        this.start(cls);
    }

    async start(cls: message) {
        let req = await server.api('player/task/Look', {}, cls)
        if (!req) return;
        
        cls.send_v2(temp_text.temp_task(req))
    }

}