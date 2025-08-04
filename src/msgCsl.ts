import { Context, Session } from "koishi";
import server from "./plugin/server";
import sessions from "./plugin/sessions";
import { ClientInfo, Message, UserInfo } from "./shared/IMassage";

/**
 * 消息处理类
 * 负责处理 Koishi 会话消息并发送到服务器
 */
export class SendMsg {
    /**
     * 处理消息内容，移除斜杠和多余空格
     * @param content 原始消息内容
     * @returns 处理后的消息内容
     */
    private static processMessageContent(content: string): string {
        if (!content) return '';
        
        // 移除斜杠和多余空格
        return content
            .replace(/\//g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    /**
     * 创建机器人信息对象
     * @param session Koishi 会话对象
     * @returns 机器人信息
     */
    private static createClientInfo(session: Session<never, never, Context>): ClientInfo {
        return {
            id: session.bot.userId,
            platform: session.bot.platform,
            name: session.bot.user.name,
        };
    }

    /**
     * 创建用户信息对象
     * @param session Koishi 会话对象
     * @returns 用户信息
     */
    private static createUserInfo(session: Session<never, never, Context>): UserInfo {
        return {
            id: session.author.id,
            name: session.author.name,
            isBot: session.author.isBot,
        };
    }

    /**
     * 创建消息信息对象
     * @param session Koishi 会话对象
     * @param processedContent 处理后的消息内容
     * @returns 消息信息
     */
    private static createMessageInfo(
        session: Session<never, never, Context>, 
        processedContent: string
    ): Message {
        return {
            userId: session.author.id,
            guildId: session.guildId,
            msgId: session.messageId,
            private: !session.guildId,
            content: processedContent,
        };
    }

    /**
     * 构造函数
     * @param session Koishi 会话对象
     */
    constructor(session: Session<never, never, Context>) {
        try {
            // 处理消息内容
            const processedContent = SendMsg.processMessageContent(session.content);
            
            // 创建各种信息对象
            const botInfo = SendMsg.createClientInfo(session);
            const userInfo = SendMsg.createUserInfo(session);
            const msgInfo = SendMsg.createMessageInfo(session, processedContent);

            if(botInfo.id == userInfo.id){
                // 防止机器人发送自身消息
                console.log('发送者与机器人ID相同')
                return;
            }

            // 存储会话信息
            sessions.set(msgInfo.userId, session);

            // 发送消息到服务器
            server.api('Message', {
                UserInfo: userInfo,
                ClientInfo: botInfo,
                Message: msgInfo
            }).catch(error => {
                console.error('发送消息到服务器失败:', error);
            });
        } catch (error) {
            console.error('处理消息时发生错误:', error);
        }
    }
}