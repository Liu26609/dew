import { Context } from "koishi";
import { MsgMessage } from "../shared/MsgMessage";
import { console } from "./console";

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
export class MessageQueue extends console {
  private queue: QueueItem[] = [];
  private isProcessing = false;
  private processingTimeout: NodeJS.Timeout | null = null;
  private readonly MAX_QUEUE_SIZE = 9999; // 最大队列长度
  private readonly PROCESSING_TIMEOUT = 5000; // 5秒处理超时

  constructor() {
    super();
    this.log(`最大队列长度:${this.MAX_QUEUE_SIZE}\n处理超时:${this.PROCESSING_TIMEOUT}ms`);
  }

  /**
   * 添加消息到队列
   * @param data 消息数据
   * @param ctx Koishi上下文
   * @returns 是否成功添加
   */
  addToQueue(data: MsgMessage, ctx: Context): boolean {
    // 检查队列是否已满
    if (this.queue.length >= this.MAX_QUEUE_SIZE) {
      this.log('队列已满，丢弃消息');
      return false;
    }

    const queueItem: QueueItem = {
      id: this.generateQueueId(),
      data,
      ctx,
      timestamp: Date.now()
    };

    // 添加到队列末尾
    this.queue.push(queueItem);
    
    this.log(`消息已加入队列，当前队列长度: ${this.queue.length}`);
    
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
      this.log('队列处理完成');
      return;
    }

    const item = this.queue.shift()!;
    
    // 设置处理超时
    this.processingTimeout = setTimeout(() => {
      this.log(`消息处理超时: ${item.id}`);
      this.processNextMessage();
    }, this.PROCESSING_TIMEOUT);

    try {
      this.log(`开始处理消息: ${item.id}, 队列剩余: ${this.queue.length}`);
      
      // 处理消息
      await this.processMessage(item);
      
      this.log(`消息处理完成: ${item.id}`);
    } catch (error) {
      this.log(`消息处理失败: ${item.id}, 错误: ${error}`);
    } finally {
      // 清除超时
      if (this.processingTimeout) {
        clearTimeout(this.processingTimeout);
        this.processingTimeout = null;
      }
      
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
      const module = require(`./serverHandel/${item.data.action}`).default;
      let handel = new module(item.data);
      handel.set(item.ctx);
      await handel.start(item.data);
    } catch (error) {
      this.log(`模块加载失败: ${error}`);
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
    this.log('队列已清空');
  }
}

// 创建全局消息队列实例
export const messageQueue = new MessageQueue(); 