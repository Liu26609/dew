import battleText from "../../temp/battleText"
import server from "../../server"
import { MSG_BATTLELOG, MsgAction } from '../../shared/master/MsgAction';
import message from "../../trigger/message"

export default class {
    constructor(cls: message) {
        this.start(cls)
    }
    async start(cls: message) {
        let data = await server.api('debug/Battle', {}, cls)
        if(!data)return;
    }
}