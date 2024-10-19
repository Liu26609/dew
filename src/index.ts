import { Context, Schema, Time } from 'koishi'
import bot_logic from './trigger/bot_logic'
import ET from './lib/ET'
import server from './server'
import inputManage from './inputManage'
import common from './lib/common'
import actionCfg from './cfg/actionCfg'
export const name = 'dew-bot'
const path = require('path');
export interface Config {
  调试模式: boolean,
  服务器地址: string,
}
export let log: any

export const Config: Schema<Config> = Schema.object({
  调试模式: Schema.boolean().default(true),
  服务器地址: Schema.string().default('ws://139.159.214.249:8848')
  // 服务器地址: Schema.string().default('ws://127.0.0.1:8848')
  // 139.159.214.249
})

export let CFG: Config;


export async function apply(ctx: Context, config: Config) {
  CFG = config;
  log = ctx.logger('[game]');
  ctx.on('dispose', () => {
    // 修复热重载 监听残留
    ET.removeAllListeners()
    // 在插件停用时关闭端口
    server.dispose()
  })
  for (let index = 0; index < actionCfg.length; index++) {
    const element = actionCfg[index];
    let cls = ctx.command(element.key, `💡${element.key_tips}`)
    // option 不适合本机器人
    // if (element.option) {
    //   cls.option('世界名', '<世界名> 指定进入的世界')
    // }
    if (element.tips.length > 0) {
      cls.usage(`════🔵指令描述═━┄\n${element.tips}`)
    }
    if (element.example.length > 0) {
      for (let i = 0; i < element.example.length; i++) {
        const example = element.example[i];
        cls.example(`🌰栗子:${example}`)
      }
    }

    cls.action((_:any, ag:any) => {
      const classPath = path.resolve(__dirname, `./action/${element.path}`);
      let msg = inputManage.get_msg(_.session.messageId)
      common.importClass(classPath, [msg, ag])
    })
  }

  ctx.on('ready', async () => {
    if (!server.init) {
      await server.setWsUrl(CFG.服务器地址);
    }
    inputManage.init()

  })
  /**
   * string: string 字符串
number: number 数值
bigint: bigint 大整数
text: string 贪婪匹配的字符串
user: string 用户，格式为 {platform}:{id} (调用时可以使用 at 元素或者 @{platform}:{id} 的格式)
channel: string 频道，格式为 {platform}:{id} (调用时可以使用 sharp 元素或者 #{platform}:{id} 的格式)
integer: number 整数
posint: number 正整数
natural: number 正整数
date: Date 日期
image: Dict 图片
   */

  // ctx.command('啊啊.sub <世界名:number> 进入轮回空间')
  //   .option('世界名', '<世界名> 指定进入的世界')
  //   .usage('注意：参数请写在最前面，不然会被当成 message 的一部分！')
  //   .example('开始历练 火影忍者')
  //   .action((_, ag) => {
  //     const classPath = path.resolve(__dirname, `./action/common/menu`);
  //     let msg = inputManage.get_msg(_.session.messageId)
  //     common.importClass(classPath, [msg, ag])
  //   })

  // ctx.command('开始历练 <世界名:string> 进入轮回空间')
  //   .option('世界名', '<世界名> 指定进入的世界')
  //   .usage('注意：参数请写在最前面，不然会被当成 message 的一部分！')
  //   .example('开始历练 火影忍者')
  //   .action((_, message) => {
  //     const classPath = path.resolve(__dirname, `./action/common/menu`);
  //     let msg = inputManage.get_msg(_.session.messageId)
  //     common.importClass(classPath, [msg, message])
  //   })

  ctx.middleware((session:any, next) => {
    session.content = session.content.toLowerCase();
    session.content = session.content.replace('hp', ' -h');
    return next()
  }, true)
  ctx.on('message', async (session) => {
    let _logic = new bot_logic(session)

    let msg = _logic.getCls_msg(session)
    inputManage.input_msg(msg)
  })
}