import { Context, Session } from "koishi";
import server from "./plugin/server";
import sessions from "./plugin/sessions";
import { ClientInfo, Message, UserInfo } from "./shared/IMassage";

export class sendMsg {
    constructor(session: Session<never, never, Context>) {
        let botInfo: ClientInfo = {
            id: session.bot.userId,
            platform: session.bot.platform,
            name: session.bot.user.name,
            avatar: session.bot.user.avatar,
        }
        let content = session.content;
        // 如果 如果消息带/ 或者空格 则去除
        if (content.includes('/')) {
            content = content.replace(/\//g, '').replace(/\s+/g, ' ').trim();
        }
        let msgInfo: Message = {
            userId: session.author.id,
            guildId: session.guildId,
            msgId: session.messageId,
            private: !session.guildId,
            content: content,
        }
        let userInfo: UserInfo = {
            id: session.author.id,
            name: session.author.name,
            avatar: session.author.avatar,
            isBot: session.author.isBot,
        }
        sessions.set(msgInfo.userId, session)
        server.api('Message', {
            UserInfo: userInfo,
            ClientInfo: botInfo,
            Message: msgInfo
        })
    }
}