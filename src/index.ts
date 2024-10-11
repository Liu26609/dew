import { Context, Schema,Time  } from 'koishi'
import bot_logic from './trigger/bot_logic'
import ET from './lib/ET'
import server from './server'
import inputManage from './inputManage'
export const name = 'dew-bot'

export interface Config {
  测试参数: string
}
export let logger: any
export const Config: Schema<Config> = Schema.object({
  测试参数: Schema.string().default('测试')
})

export async function apply(ctx: Context) {
  logger = ctx.logger('[game]')
  inputManage.init()

  await server.setWsUrl('ws://127.0.0.1:8848');
  server.api('Ping',{});
  ctx.on('message', async (session) => {
    new bot_logic(session)
  })

  ctx.before('disconnect' as any, () => {
    console.log('插件热重载');
    ET.removeAllListeners() 
  })
}