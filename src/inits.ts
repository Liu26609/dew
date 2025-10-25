import { Context } from "koishi";
import { Config } from ".";
import { } from '@koishijs/plugin-console'
import { resolve } from 'path'
import puppeteer from "./plugin/puppeteer";
import server from "./plugin/server";
import sessions from "./plugin/sessions";
import { messageQueue } from "./plugin/messageQueue";
import { MsgMessage } from "./shared/bot/MsgMessage";

export default function apply(ctx: Context, config: Config) {
  // 初始化消息队列
  messageQueue.init(ctx);

  ctx.inject(['puppeteer'], (ctx) => {
    puppeteer.init(ctx, config)
  })
  sessions.init(ctx)

  // 初始化服务器连接（异步）
  server.init(ctx, config)

  // 设置连接成功后的回调
  server.onConnected(() => {
    server.lisentMsg('Message', ((data: MsgMessage) => {
      messageQueue.addToQueue(data, ctx);
    }), this)
  })
  /** 监听消息 上传到服务器 **/
  ctx.on('message', (session) => {
    server.uploadMessage(session);
  })

 
}
