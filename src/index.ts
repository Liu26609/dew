import { Context, Schema } from 'koishi'
import puppeteer from './plugin/puppeteer'
import { DataService } from '@koishijs/plugin-console'
import inits from './inits'
import server from './plugin/server'
import { Message, UserInfo, ClientInfo } from './shared/face/IMassage'
import { MsgMessage } from './shared/protocols/MsgMessage'
import sessions from './plugin/sessions'
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

export function apply(ctx: Context,config: Config) {
  ctx.plugin(inits,config)
  ctx.on('message', (session) => {
    // bot id  bot 平台
    let botInfo: ClientInfo = {
      id: session.bot.userId,
      platform: session.bot.platform,
      name: session.bot.user.name,
      avatar: session.bot.user.avatar,
    }
    let msgInfo: Message = {
      userId: session.author.id,
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
