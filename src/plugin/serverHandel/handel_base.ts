import { MsgMessage } from "../../shared/protocols/MsgMessage";
import { Context } from "koishi";
export default class handel_base {
    ctx: Context;
    constructor(data: MsgMessage) {
        console.log('handel_base:::', data)

    }
    set(ctx: Context) {
        this.ctx = ctx;
    }
    send(data: MsgMessage,content:any) {
        // console.log(this.ctx.bots)
        let sendInfo = data.Message;
        if(sendInfo.private){
            this.ctx.bots[0].sendPrivateMessage(sendInfo.userId, content)
        }else{
            this.ctx.bots[0].sendMessage(sendInfo.guildId, content)
        }
    }
    start(data: MsgMessage) {
        console.log('handel_base:::', data)
    }
}


