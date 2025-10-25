import { Context } from "koishi";
import { MsgMessage } from "../shared/bot/MsgMessage";

/**
 * 消息队列项
 */
interface QueueItem {
  id: string;
  data: MsgMessage;
  ctx: Context;
  timestamp: number;
}

/**
 * 消息队列管理器
 * 负责按顺序处理消息，避免并发冲突
 */
export class MessageQueue{
  private queue: QueueItem[] = [];
  private isProcessing = false;
  private processingTimeout: any = null;
  private readonly PROCESSING_TIMEOUT = 5000; // 5秒处理超时
  private initialized = false;
  private ctx?: Context;

  constructor() {
    
  }

  /**
   * 初始化队列
   * @param ctx Koishi上下文
   */
  init(ctx: Context): void {
    this.ctx = ctx;
    this.initialized = true;
    ctx.on('dispose', () => {
      this.dispose();
    });
  }
  private dispose(): void {
    this.clearQueue();
  }


  /**
   * 添加消息到队列
   * @param data 消息数据
   * @param ctx Koishi上下文
   * @returns 是否成功添加
   */
  addToQueue(data: MsgMessage, ctx: Context): boolean {
    // 检查队列是否已满
    const queueItem: QueueItem = {
      id: this.generateQueueId(),
      data,
      ctx,
      timestamp: Date.now()
    };

    // 添加到队列末尾
    this.queue.push(queueItem);
    
    
    // 启动处理
    this.startProcessing();
    
    return true;
  }

  /**
   * 生成队列项ID
   * @returns 唯一ID
   */
  private generateQueueId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 启动消息处理
   */
  private startProcessing(): void {
    if (this.isProcessing) {
      return; // 已在处理中
    }

    this.isProcessing = true;
    this.processNextMessage();
  }

  /**
   * 处理下一条消息
   */
  private async processNextMessage(): Promise<void> {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    const item = this.queue.shift()!;
    
    // 设置处理超时
    if (this.ctx) {
      this.processingTimeout = this.ctx.setTimeout(() => {
        this.processNextMessage();
      }, this.PROCESSING_TIMEOUT);
    }

    try {
      
      // 处理消息
      await this.processMessage(item);
      
    } catch (error) {
      console.log(`消息处理失败: ${item.id}, 错误: ${error}`);
    } finally {
      // 清除超时标记（Koishi的setTimeout会自动清理）
      this.processingTimeout = null;
      
      // 立即处理下一条消息
      this.processNextMessage();
    }
  }

  /**
   * 处理单条消息
   * @param item 队列项
   */
  private async processMessage(item: QueueItem): Promise<void> {
    try {
      const handleType = item.data.handleType;
      const module = require(`./serverHandel/${handleType}`).default;
      let handel = new module(item.data);
      handel.set(item.ctx);
      await handel.start(item.data);
    } catch (error) {
      console.log(`模块加载失败: ${error}`);
      throw error;
    }
  }

  /**
   * 获取队列状态
   * @returns 队列状态信息
   */
  getQueueStatus(): {
    length: number;
    isProcessing: boolean;
  } {
    return {
      length: this.queue.length,
      isProcessing: this.isProcessing
    };
  }

  /**
   * 清空队列
   */
  clearQueue(): void {
    this.queue = [];
    this.isProcessing = false;
    this.processingTimeout = null;
    console.log('messageQueue:clear');
  }
}

// 创建全局消息队列实例
export const messageQueue = new MessageQueue(); 