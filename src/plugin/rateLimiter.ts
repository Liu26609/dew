
// 消息频率限制管理器
export class RateLimiter {
  private userLastMessageTime = new Map<string, number>();
  private userBlacklist = new Map<string, number>(); // 拉黑用户列表
  private readonly COOLDOWN_TIME = 2000; // 2秒冷却时间
  private blacklistTime: number; // 拉黑时间（毫秒）
  private cleanupTimer: NodeJS.Timeout | null = null;

  constructor(blacklistMinutes: number = 5) {
    if(blacklistMinutes < 1) blacklistMinutes = 1;
    this.blacklistTime = blacklistMinutes * 60 * 1000;
  }

  /**
   * 检查用户是否被拉黑
   * @param userId 用户ID
   * @returns 是否被拉黑
   */
  isBlacklisted(userId: string): boolean {
    const blacklistTime = this.userBlacklist.get(userId);
    if (!blacklistTime) return false;
    
    const now = Date.now();
    if (now - blacklistTime >= this.blacklistTime) {
      // 拉黑时间已过，移除拉黑
      this.userBlacklist.delete(userId);
      return false;
    }
    
    return true;
  }

  /**
   * 拉黑用户
   * @param userId 用户ID
   */
  blacklistUser(userId: string) {
    this.userBlacklist.set(userId, Date.now());
  }

  /**
   * 检查用户是否可以发送消息
   * @param userId 用户ID
   * @returns 是否可以发送消息
   */
  canSendMessage(userId: string): boolean {
    // 首先检查是否被拉黑
    if (this.isBlacklisted(userId)) {
      return false;
    }

    const now = Date.now();
    const lastMessageTime = this.userLastMessageTime.get(userId);
    
    if (!lastMessageTime) {
      // 用户第一次发送消息
      this.userLastMessageTime.set(userId, now);
      return true;
    }
    
    // 检查是否超过冷却时间
    if (now - lastMessageTime >= this.COOLDOWN_TIME) {
      this.userLastMessageTime.set(userId, now);
      return true;
    }
    
    // 触发频率限制，拉黑用户
    this.blacklistUser(userId);
    return false;
  }

  /**
   * 清理过期的用户记录（可选，防止内存泄漏）
   */
  cleanup() {
    const now = Date.now();
    const expiredTime = now - 5 * 60 * 1000; // 清理5分钟前的记录
    let cleanedCount = 0;
    
    for (const [userId, lastTime] of this.userLastMessageTime.entries()) {
      if (lastTime < expiredTime) {
        this.userLastMessageTime.delete(userId);
        cleanedCount++;
      }
    }
    
    // 清理过期的拉黑记录
    for (const [userId, blacklistTime] of this.userBlacklist.entries()) {
      if (now - blacklistTime >= this.blacklistTime) {
        this.userBlacklist.delete(userId);
        cleanedCount++;
      }
    }
  }

  /**
   * 启动定期清理
   */
  startCleanup() {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000); // 每5分钟清理一次
  }

  /**
   * 停止定期清理
   */
  stopCleanup() {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
  }
} 