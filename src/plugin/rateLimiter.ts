// 消息频率限制管理器
import { Context } from 'koishi';

export class RateLimiter {
    private userMessageTimes: Map<string, number[]> = new Map();
    private blacklist: Map<string, number> = new Map();
    private cleanupInterval: any = null;
    private blacklistDuration: number; // 拉黑时长（分钟）
    private maxMessagesPerMinute: number = 10; // 每分钟最大消息数
    private ctx?: Context;

    constructor(blacklistDurationMinutes: number = 5) {
        this.blacklistDuration = blacklistDurationMinutes * 60 * 1000; // 转换为毫秒
    }

    // 设置 Koishi 上下文
    setContext(ctx: Context) {
        this.ctx = ctx;
    }

  /**
   * 检查用户是否可以发送消息
   */
  canSendMessage(userId: string): boolean {
    const now = Date.now();
    
    // 检查是否在黑名单中
    if (this.isBlacklisted(userId)) {
      return false;
    }

    // 获取用户的消息时间记录
    const userTimes = this.userMessageTimes.get(userId) || [];
    
    // 清理1分钟之前的记录
    const oneMinuteAgo = now - 60 * 1000;
    const recentMessages = userTimes.filter(time => time > oneMinuteAgo);
    
    // 检查是否超过频率限制
    if (recentMessages.length >= this.maxMessagesPerMinute) {
      // 拉黑用户
      this.blacklist.set(userId, now + this.blacklistDuration);
      return false;
    }

    // 记录这次消息时间
    recentMessages.push(now);
    this.userMessageTimes.set(userId, recentMessages);
    
    return true;
  }

  /**
   * 检查用户是否被拉黑
   */
  isBlacklisted(userId: string): boolean {
    const blacklistEnd = this.blacklist.get(userId);
    if (!blacklistEnd) return false;

    const now = Date.now();
    if (now > blacklistEnd) {
      // 拉黑时间已过，移除黑名单
      this.blacklist.delete(userId);
      return false;
    }

    return true;
  }

      /**
     * 启动定期清理
     */
    startCleanup(): void {
        if (this.ctx) {
            const scheduleNext = () => {
                this.cleanupInterval = this.ctx?.setTimeout(() => {
                    this.cleanup();
                    if (this.cleanupInterval) {
                        scheduleNext(); // 递归调度下一次清理
                    }
                }, 5 * 60 * 1000); // 每5分钟清理一次
            };
            scheduleNext();
        }
    }

    /**
     * 停止定期清理
     */
    stopCleanup(): void {
        this.cleanupInterval = null; // 停止递归调度
    }

  /**
   * 清理过期数据
   */
  private cleanup(): void {
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;

    // 清理消息时间记录
    for (const [userId, times] of this.userMessageTimes.entries()) {
      const recentTimes = times.filter(time => time > oneHourAgo);
      if (recentTimes.length === 0) {
        this.userMessageTimes.delete(userId);
      } else {
        this.userMessageTimes.set(userId, recentTimes);
      }
    }

    // 清理过期的黑名单
    for (const [userId, blacklistEnd] of this.blacklist.entries()) {
      if (now > blacklistEnd) {
        this.blacklist.delete(userId);
      }
    }
  }
} 