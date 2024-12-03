import server from "../../../server";
import { temp_card } from "../../../temp/temp_text";
import message from "../../../trigger/message";

export default class {
    constructor(cls: message, ...data) {
        this.start(cls, ...data)
    }
    start(cls: message, ...data) {
        server.api('player/operate/Confirm', {}, cls)
    }
}