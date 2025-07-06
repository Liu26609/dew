import { Context, Schema } from 'koishi'
import inits from './inits'
import { SendMsg } from './msgCsl'
import { RateLimiter } from './plugin/rateLimiter'

export const name = 'dew-bot'

export interface Config {
  调试模式: boolean;
  服务器环境: '测试服' | '开发服' | '正式服';
  频率限制: number;
}
export const inject = ['puppeteer'];

export const Config: Schema<Config> = Schema.object({
  调试模式: Schema.boolean().default(false).description('个人开发调试用'),
  服务器环境: Schema.union([
    Schema.const('测试服').description('本地测试服务器'),
    Schema.const('开发服').description('开发服务器'),
    Schema.const('正式服').description('正式服务器'),
  ]).default('测试服').description('选择服务器环境'),
  频率限制: Schema.number().default(5).description('频率限制后拉黑时间（分钟）'),
})

export function apply(ctx: Context, config: Config) {
  ctx.plugin(inits, config)
  
  // 创建频率限制器实例，传入配置的拉黑时间
  const rateLimiter = new RateLimiter(config.频率限制);
  
  // 设置 Koishi 上下文
  rateLimiter.setContext(ctx);
  
  // 启动定期清理
  rateLimiter.startCleanup();
  
  // 插件卸载时清理定时器
  ctx.on('dispose', () => {
    rateLimiter.stopCleanup();
  });
  
  ctx.on('message', (session) => {
    const userId = session.author.id;
    
         // 检查频率限制
     if (!rateLimiter.canSendMessage(userId)) {
       // 被拉黑或触发频率限制
       session.send(`消息发送过于频繁，已拉黑${config.频率限制}分钟！`);
       return;
     }
    
    // 通过频率限制，正常处理消息
    new SendMsg(session);
  })
}
