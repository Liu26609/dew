import { MsgMessage } from "../../shared/protocols/MsgMessage";
import { Context } from "koishi";
import sessions from "../sessions";
export default class handel_base {
    ctx: Context;
    constructor(data: MsgMessage) {
        console.log('handel_base:::', data)

    }
    set(ctx: Context) {
        this.ctx = ctx;
    }
    send(data: MsgMessage,content:any) {
        let sendInfo = data.Message;
        let session = sessions.get(sendInfo.userId)
        session.send(content)
    }
    start(data: MsgMessage) {
        console.log('handel_base:::', data)
    }
}


