import { Context } from "koishi";
import sessions from "../sessions";
import { MsgMessage } from "../../shared/bot/MsgMessage";
export default class handel_base {
    ctx: Context;
    constructor(data: MsgMessage) {
        // console.log('handel_base:::', data)

    }
    set(ctx: Context) {
        this.ctx = ctx;
    }
    async send(data: MsgMessage,content:any) {
        console.log('handel_base:::send', data, content)
        // let sendInfo = data.Message;
        let session = sessions.get(data.userId)
        if(!session){
            this.ctx.logger.info('session not found', data.userId)
            return;
        }
        /** 为了美观，如果是qq平台并且是群聊，在消息前面添加换行符 **/
        let finalContent = content;
        // 判断是否是qq平台并且是群聊：channel.type === 0 表示群聊
        if(session.event?.platform === 'qq' && session.event?.channel?.type === 0) {
            // 如果 content 是字符串，直接添加换行符
            finalContent = 'Ciallo～(∠・ω< )\n' + content;
        }
        await session.send(finalContent)
    }
    start(data: MsgMessage) {
        // console.log('handel_base:::', data)
    }
}


