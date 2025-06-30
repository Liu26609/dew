import { Context, Schema } from 'koishi'
import puppeteer from './plugin/puppeteer'
import { DataService } from '@koishijs/plugin-console'
import inits from './inits'
import server from './plugin/server'
import sessions from './plugin/sessions'
import { ClientInfo, Message, UserInfo } from './shared/IMassage'
export const name = 'dew-bot'

export interface Config {
  调试模式: boolean;
  服务器地址: string;
}
export const inject = ['puppeteer'];

export const Config: Schema<Config> = Schema.object({
  调试模式: Schema.boolean().default(false).description('个人开发调试用'),
  服务器地址: Schema.string().default('ws://dew-bot.cn').description('服务器地址'),
})

export function apply(ctx: Context, config: Config) {
  ctx.plugin(inits, config)
  ctx.on('message', (session) => {
    // bot id  bot 平台
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
    console.log(sessions.size())
    server.api('Message', {
      UserInfo: userInfo,
      ClientInfo: botInfo,
      Message: msgInfo
    })
    // server.api('Send', {
    //   content: ''
    // })

    // puppeteer.render('mini_texas', {}).then((e) => {
    //   session.send(e)
    // })
    // if (session.content === '天王盖地虎') {
    //   session.send('宝塔镇河妖')
    // session.bot.sendPrivateMessage(session.userId, 'hello word')
    // session.bot.sendMessage(session.guildId, session.messageId, 'hello word 1')
    // }
  })
}
