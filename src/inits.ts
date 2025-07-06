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
  // 初始化消息队列
  messageQueue.init(ctx);
  
  ctx.inject(['puppeteer'], (ctx) => {
    puppeteer.init(ctx,config)
  })
  sessions.init(ctx)
  
  // 初始化服务器连接（异步）
  server.init(ctx,config)
  
  // 设置连接成功后的回调
  server.onConnected(() => {
    try {
      server.lisentMsg('Message', ((data: MsgMessage) => {
        try {
          // 使用消息队列处理消息
          const success = messageQueue.addToQueue(data, ctx);
          if (!success) {
            console.error('消息队列已满，无法处理新消息');
          }
        } catch (error) {
          console.error('添加消息到队列失败:', error)
        }
      }), this)
    } catch (error) {
      console.error('消息监听设置失败:', error)
    }
  })

  ctx.on('dispose', () => {
    messageQueue.clearQueue();
  });
}
