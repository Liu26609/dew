import { Context } from "koishi";
import { Config } from ".";
import { } from '@koishijs/plugin-console'
import { resolve } from 'path'
import puppeteer from "./plugin/puppeteer";
import server from "./plugin/server";
import sessions from "./plugin/sessions";
import { MsgMessage } from "./shared/MsgMessage";
export default function apply(ctx: Context, config: Config) {
  ctx.inject(['puppeteer'], (ctx) => {
    puppeteer.init(ctx,config)
  })
  sessions.init(ctx)
  // server.setApiUrl('http://localhost:3000')
  
  // 初始化服务器连接（异步）
  server.init(ctx,config)
  
  // 设置连接成功后的回调
  server.onConnected(() => {
    try {
      server.lisentMsg('Message', ((data: MsgMessage) => {
        try {
          const module = require(`./plugin/serverHandel/${data.action}`).default;
          let handel = new module(data)
          handel.set(ctx)
          handel.start(data)
        } catch (error) {
          console.error('模块加载失败:', error)
        }
      }), this)
    } catch (error) {
      console.error('消息监听设置失败:', error)
    }
  })
  
  // ctx.inject(['console'], (ctx) => {
  //   ctx.console.addEntry({
  //     dev: resolve(__dirname, './client/index.ts'),
  //     prod: resolve(__dirname, './dist'),
  //   })
  // })
}
