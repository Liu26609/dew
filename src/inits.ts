import { Context } from "koishi";
import { Config } from ".";
import { } from '@koishijs/plugin-console'
import { resolve } from 'path'
import puppeteer from "./plugin/puppeteer";
import server from "./plugin/server";
export default function apply(ctx: Context, config: Config) {
  puppeteer.init(ctx)
  // server.setApiUrl('http://localhost:3000')
  server.start(ctx)
  server.setWsUrl('ws://127.0.0.1:3000')
  ctx.inject(['console'], (ctx) => {
    ctx.console.addEntry({
      dev: resolve(__dirname, './client/index.ts'),
      prod: resolve(__dirname, './dist'),
    })
  })
}
