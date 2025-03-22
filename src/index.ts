import { Context, Schema } from 'koishi'
import puppeteer from './plugin/puppeteer'
import { DataService } from '@koishijs/plugin-console'
import inits from './inits'
export const name = 'dew-bot'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  // 如果收到“天王盖地虎”，就回应“宝塔镇河妖”
  ctx.plugin(inits)
  ctx.on('message', (session) => {
    puppeteer.render('skill', { name: "测试技能" }).then((e) => {
      session.send(e)
    })
    if (session.content === '天王盖地虎') {
      session.send('宝塔镇河妖')

      session.bot.sendPrivateMessage(session.userId, 'hello word')
    }
  })
}
