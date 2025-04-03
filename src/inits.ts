import { Context } from "koishi";
import { Config } from ".";
import { } from '@koishijs/plugin-console'
import { resolve } from 'path'
import puppeteer from "./plugin/puppeteer";
import server from "./plugin/server";
import { MsgMessage } from "./shared/protocols/MsgMessage";
import sessions from "./plugin/sessions";
export default function apply(ctx: Context, config: Config) {
  ctx.inject(['puppeteer'], (ctx) => {
    puppeteer.init(ctx,config)
  })
  sessions.init(ctx)
  // server.setApiUrl('http://localhost:3000')
  server.init(ctx,config)
  
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
  // ctx.inject(['console'], (ctx) => {
  //   ctx.console.addEntry({
  //     dev: resolve(__dirname, './client/index.ts'),
  //     prod: resolve(__dirname, './dist'),
  //   })
  // })
}
