import { Context, Schema,Time  } from 'koishi'
import bot_logic from './trigger/bot_logic'
import ET from './lib/ET'
import server from './server'
import inputManage from './inputManage'
export const name = 'dew-bot'

export interface Config {
  调试模式: boolean
}
export let logger: any
export const Config: Schema<Config> = Schema.object({
  调试模式: Schema.boolean().default(true),
})

export let CFG:Config;


export async function apply(ctx: Context, config: Config) {
  logger = ctx.logger('[game]');
  CFG = config;
  await server.setWsUrl('ws://127.0.0.1:8848');
  inputManage.init()
 
  ctx.on('message', async (session) => {
    new bot_logic(session)
  })
}