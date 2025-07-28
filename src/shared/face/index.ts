import { EquipAttType, ItemType, quality, qualityName, qualityGradient, sort_type } from './enums';

//道具
export interface Item {
  uuid: string
  emoji: string,
  icon: string,
  /**
   * 品质
   */
  quality: quality,
  // 道具ID
  id: string;
  // 道具名称
  name: string;
  // 道具描述
  desc: string;
  // 道具分类
  type: ItemType;
  // 数量
  count: number;
  // 道具数据
  data: any;
}
export enum UserLevel {
  玩家 = 0,
  赞助会员 = 1,
  管理员 = 2,
  开发者 = 3,
}
/**
 * 排行榜数据类型
 */
export interface RankingItem {
  /** 玩家ID */
  playerId: string;
  /** 玩家名称 */
  playerName: string;
  /** 玩家头像 */
  playerAvatar: string;
  /** 玩家emoji */
  playerEmoji: string;
  /** 排行分数 */
  score: number;
  /** 排名 */
  rank: number;
  /** 最后更新时间 */
  lastUpdateTime: number;
}
export interface MailItem {
  title: string;
  _id: string;
  sys: boolean;//是否是系统邮件
  read: boolean;
  from_id: string;
  to_id: string;
  msg: string;
  items: Item[];
  send_time: number;//发送时间
  expire_time: number;//过期时间
}

export interface DataEquip {
  id:string,
  uuid: string
  emoji: string,
  icon: string,
  /**
   * 品质
   */
  quality: quality,
  // 道具名称
  name: string;
  // 道具描述
  desc: string;
  // 道具分类
  type: string;
  // 数量
  count: number;
  attType: EquipAttType,
  // 装备来源
  source: string,
  // 创建者UID
  creator: string,
  attribute: { key: string, val: number }[],
  skill: { skillId: string; reName?: string; }[],
  createTime: number;
  updateTime: number;
  status?: 'pending' | 'approved' | 'rejected'; // 审核状态
  reviewer?: string; // 审核者ID
  reviewTime?: number; // 审核时间
  reviewNote?: string; // 审核备注
}



// 删除ItemType的本地定义
// 删除本地ItemType枚举定义
export interface panel_common{
  title:string,
  icon?:string,
  emoji:string,
  list:{key:string,val:string|number|undefined}[]
}