import { Context, Schema } from 'koishi'
import inits from './inits'
import { SendMsg } from './msgCsl'
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
    new SendMsg(session);
  })
}
