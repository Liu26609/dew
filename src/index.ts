import { Context, Schema } from 'koishi'
import puppeteer from './plugin/puppeteer'
import { DataService } from '@koishijs/plugin-console'
import inits from './inits'
import server from './plugin/server'
import { Message, UserInfo, ClientInfo } from './shared/face/IMassage'
import { MsgMessage } from './shared/protocols/MsgMessage'
export const name = 'dew-bot'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.plugin(inits)
  ctx.on('message', (session) => {
    // bot id  bot 平台
    let botInfo: ClientInfo = {
      id: session.bot.userId,
      platform: session.bot.platform,
      name: session.bot.user.name,
      avatar: session.bot.user.avatar,
    }
    let msgInfo: Message = {
      guildId: session.guildId,
      msgId: session.messageId,
      private: !session.guildId,
      content: session.content,
    }
    let userInfo: UserInfo = {
      id: session.author.id,
      name: session.author.name,
      avatar: session.author.avatar,
      isBot: session.author.isBot,
    }
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
