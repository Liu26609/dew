import { Context } from "koishi";
import { Config } from ".";
import { } from '@koishijs/plugin-console'
import { resolve } from 'path'
import puppeteer from "./plugin/puppeteer";
import server from "./plugin/server";
import sessions from "./plugin/sessions";
import { MsgMessage } from "./shared/MsgMessage";
import { messageQueue } from "./plugin/messageQueue";

export default function apply(ctx: Context, config: Config) {
  ctx.inject(['puppeteer'], (ctx) => {
    puppeteer.init(ctx,config)
  })
  sessions.init(ctx)
  // server.setApiUrl('http://localhost:3000')
  server.init(ctx,config)
  
  // 使用消息队列处理消息
  server.lisentMsg('Message', ((data: MsgMessage) => {
    try {
      // 将消息添加到队列中，按顺序处理
      const success = messageQueue.addToQueue(data, ctx);
      if (!success) {
        console.error('消息队列已满，无法处理新消息');
      }
    } catch (error) {
      console.error('添加消息到队列失败:', error)
    }
  }), this)


  ctx.on('dispose', () => {
    messageQueue.clearQueue();
  });
}
