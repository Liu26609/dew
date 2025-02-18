import { Command, Context, Schema, Time, h } from 'koishi'
import { } from 'koishi-plugin-puppeteer';
import bot_logic from './trigger/bot_logic'
import ET from './lib/ET'
import server from './server'
import inputManage from './inputManage'
import { } from "@satorijs/adapter-qq";
import common from './lib/common'
import actionCfg from './cfg/actionCfg'
import { Trie } from './lib/trie'
import temp_img from './temp/temp_img';
import server_tool from './server_tool';
import { helpCfg } from './cfg/helpCfg';
import APP from './APP';
export const name = 'dew-bot'
const path = require('path');
export interface Config {
  调试模式: boolean,
  忽略指令空格: boolean,
  服务器地址: string,
  wss: boolean,
  git密钥: string,
  仓库地址: string,
  预警定时: number,
  库存逻辑:string
}
export let log: any
export const inject = ['puppeteer'];

export const Config: Schema<Config> = Schema.object({
  wss: Schema.boolean().default(false).description('通常无需修改此项'),
  调试模式: Schema.boolean().default(false).description('个人开发调试用'),
  忽略指令空格: Schema.boolean().default(true).description('默认允许省略指令名后的空格'),
  服务器地址: Schema.string().default('119.29.158.200'),
  git密钥: Schema.string().default('7cd3280666bfbf9f47bd4d9056a14f2b').description('gitee私人令牌'),
  仓库地址: Schema.string().default('cxd30/bot-ui').description('仓库地址'),
  预警定时: Schema.number().default(30).description('预警任务执行时间间隔(分钟)'),
  库存逻辑: Schema.string().default('cxd30/bot-ui').description('仓库地址'),
})

export let CFG: Config;

export async function apply(ctx: Context, config: Config) {
  ctx.i18n.define("zh-CN", helpCfg);
  CFG = config;
  log = ctx.logger('[game]');
  ctx.on('dispose', () => {
    // 修复热重载 监听残留
    ET.removeAllListeners()
    // 在插件停用时关闭端口
    server.dispose()
  })
  if (CFG.调试模式) {
    CFG.服务器地址 = '127.0.0.1';
    log.info('调试模式-debug专用')
  }
  // 忽略指令空格
  reg_ignoreSeperator(ctx, config)

  // 遍历index配置
  let actionPath = path.resolve(__dirname, './action');
  let files = common.getFiles(actionPath)
  for (let index = 0; index < files.length; index++) {
    const element = files[index];
    if (element.indexOf('index') == -1) {
      continue;
    }
    common.importClass(element, [ctx])
  }
  // puppeteer 初始化
  temp_img.init(ctx)
  APP.init(ctx);
  for (let index = 0; index < actionCfg.length; index++) {
    const element = actionCfg[index];
    APP.addCommon(element)
    // let cls = ctx.command(element.key, `💡${element.key_tips}`)
    // // option 不适合本机器人
    // // if (element.option) {
    // // cls.option('改名', '<val:string>')
    // // }
    // if (element.tips.length > 0) {
    //   cls.usage(`✦─✧📜指令介绍✧─✦\n「${element.tips}」`)
    // }
    // if (element.example.length > 0) {
    //   // cls.example(`✨指令有空格哦✨`)
    //   for (let i = 0; i < element.example.length; i++) {
    //     const example = element.example[i];
    //     let icon = '①②③④⑤⑥⑦⑧⑨⑩'
    //     cls.example(`${icon[i]}${example}`)
    //   }
    // }
    // cls.action(async (_: any, ag: any) => {
    //   let msg = inputManage.get_msg(_.session.messageId)
    //   if(!msg){
    //     return
    //   }
    //   if(inputManage.wait_inputskipMap.has(msg.get_userId())){
    //     console.log('skip')
    //     return;
    //   }

    //   const classPath = path.resolve(__dirname, `./action/${element.path}`);
    //   common.importClass(classPath, [msg, ..._.args])
    // })
  }

  ctx.on('ready', async () => {
    if (!server.init) {
      await server.setWsUrl(`${CFG.wss ? 'wss' : 'ws'}://${CFG.服务器地址}:8848`);
    }
    server_tool.setApiUrl(`119.29.158.200:8849`)
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
  /**
   * 
   *         {
              "Type": "ReverseWebSocket",
              "Host": "127.0.0.1",
              "Port": 8080,
              "Suffix": "/onebot/v11/ws",
              "ReconnectInterval": 5000,
              "HeartBeatInterval": 5000,
              "HeartBeatEnable": true,
              "AccessToken": ""
          },
          {
              "Type": "ForwardWebSocket",
              "Host": "127.0.0.1",
              "Port": 8081,
              "HeartBeatInterval": 5000,
              "HeartBeatEnable": true,
              "AccessToken": ""
          },
           {
              "Type": "Http",
              "Host": "127.0.0.1",
              "Port": 8083,
              "AccessToken": ""
          }
   */
  ctx.middleware((session: any, next) => {
    log.info('[ctx-转换前]', session.content)
    let content = session.content.toLowerCase()
    if (session.platform == 'onebot') {
      const hasAnyAt = /<at id="[^"]*"[^>]*>/i.test(content);
    
      if (hasAnyAt) {
          // 如果有 at 标签，检查是否包含正确的 ID
          const correctAtRegex = new RegExp(`<at id="${session.bot.config.selfId}"[^>]*>`, 'i');
          if (!correctAtRegex.test(content)) {
              return ''  // at 标签存在但 ID 不匹配，验证不通过
          }
      }
      content = content
        .replace(/<(?!.*?@${session.bot.config.selfId})[^>]*>/gi, '')
        .replace(/\//g, '')        // 移除所有斜杠
        .replace('hp', '-h')       // 替换hp为-h
        .trim();
      session.content = content;
      log.info('[ctx-qq-转换后]', session.content, session.bot.config.selfId)
    } else {
      // <at id="550620904" name="@楚轩"/>
      session.content = session.content.toLowerCase();
      session.content = session.content.replace(/<[^>]*>/gi, '').trim();
      while (session.content.indexOf('/') > -1) {
        session.content = session.content.replace('/', '');
      }
      session.content = session.content.replace('hp', ' -h');
      log.info('[ctx-转换后]', session.content)
    }
    return next()
  }, true)
  ctx.on('message', async (session) => {
    let _logic = new bot_logic(session)

    let msg = _logic.getCls_msg(session)
    inputManage.input_msg(msg)
  })
}

export function reg_ignoreSeperator(ctx: Context, config: Config) {
  const trie = new Trie()
  const applyCommand = async (command: Command) => {
    if (!command) return
    await Promise.resolve()
    const aliases = [...Object.keys(command._aliases), ...Object.keys(command.config['aliases'] ?? {})]
    for (const name of aliases) {
      trie.insert(name)
    }
    command._disposables.push(() => aliases.splice(0, aliases.length).forEach(trie.remove.bind(trie)))
  }
  ctx.$commander._commandList.forEach(applyCommand)
  ctx.on('command-added', applyCommand)
  ctx.on('command-updated', applyCommand)
  ctx.middleware(async (session, next) => {
    const key = trie.prefixes(Command.normalize(session.stripped.content?.split(' ')[0] ?? ''))
      .filter((key) => ctx.$commander.get(key)?.config['忽略指令空格'] ?? CFG.忽略指令空格)
      ?.[0]
    if (!key) return next()
    await session.execute([session.stripped.content.slice(0, key.length), session.stripped.content.slice(key.length)].join(' '), next)
  })
}