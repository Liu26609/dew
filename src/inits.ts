import { Context } from "koishi";
import { Config } from ".";
import { } from '@koishijs/plugin-console'
import { resolve } from 'path'
import puppeteer from "./plugin/puppeteer";
export default function apply(ctx: Context, config: Config) {
  puppeteer.init(ctx)
  ctx.inject(['console'], (ctx) => {
    ctx.console.addEntry({
      dev: resolve(__dirname, './client/index.ts'),
      prod: resolve(__dirname, './dist'),
    })
  })
}
