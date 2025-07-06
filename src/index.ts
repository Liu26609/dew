import { Context, Schema } from 'koishi'
import inits from './inits'
import { SendMsg } from './msgCsl'
export const name = 'dew-bot'

export interface Config {
  调试模式: boolean;
  服务器环境: '测试服' | '开发服' | '正式服';
}
export const inject = ['puppeteer'];

export const Config: Schema<Config> = Schema.object({
  调试模式: Schema.boolean().default(false).description('个人开发调试用'),
  服务器环境: Schema.union([
    Schema.const('测试服').description('本地测试服务器'),
    Schema.const('开发服').description('开发服务器'),
    Schema.const('正式服').description('正式服务器'),
  ]).default('测试服').description('选择服务器环境'),
})

export function apply(ctx: Context, config: Config) {
  ctx.plugin(inits, config)
  ctx.on('message', (session) => {
    new SendMsg(session);
  })
}
