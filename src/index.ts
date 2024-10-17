import { Context, Schema,Time  } from 'koishi'
import bot_logic from './trigger/bot_logic'
import ET from './lib/ET'
import server from './server'
import inputManage from './inputManage'
export const name = 'dew-bot'

export interface Config {
  调试模式: boolean,
  服务器地址: string,
}
export let logger: any
export const Config: Schema<Config> = Schema.object({
  调试模式: Schema.boolean().default(true),
  服务器地址: Schema.string().default('ws://127.0.0.1:8848')
})

export let CFG:Config;


export async function apply(ctx: Context, config: Config) {
  logger = ctx.logger('[game]');
  // 修复热重载 监听残留
  ET.removeAllListeners()
  CFG = config;
  await server.setWsUrl(CFG.服务器地址);
  inputManage.init()
 
  ctx.on('message', async (session) => {
    new bot_logic(session)
  })
}