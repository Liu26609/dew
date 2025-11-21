import { Context, Schema } from 'koishi'
import inits from './inits'

export const name = 'dew-bot'

export interface Config {
  服务器地址: string;
}
export const inject = ['puppeteer'];

export const Config: Schema<Config> = Schema.object({
  // ws://127.0.0.1:3009
  服务器地址: Schema.string().default('ws://dew-bot.cn:3009').description('游戏服地址'),
})

export function apply(ctx: Context, config: Config) {
  ctx.plugin(inits, config)
  

}
