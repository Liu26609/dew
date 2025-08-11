import { ItemType, quality, qualityName, qualityGradient, sort_type } from './enums';

//道具
export interface Item {
  uuid: string
  emoji: string,
  icon: string,
  /**
   * 道具标签
   */
  tag?: string,
  /**
   * 是否可堆叠
   */
  stacking?: boolean,
  /**
   * 是否可使用堆叠使用
   */
  stacking_use?: boolean,
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
  id: string,
  /**
   * 强化等级
   */
  strengthenLevel: number,

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
  /**
   * 装备位置
   */
  solt_type: string;
  /**
   * 体系
   */
  sys: string;
  /**
   * 类型
   */
  type: string;
  /**
   * 职业
   */
  job: string;
  // 数量
  count: number;
  /**
   * 装备来源 展示用 无任何实际作用
   */
  source: string,
  // 创建者UID
  creator: string,
  attribute: { key: string, val: number }[],
  skill: DataSkill[],
  createTime: number;
  updateTime: number;
}
// 装备类型 体系 - 类型 - 职业


/**
 * 技能数据
 */
export interface DataSkill {
  skillId: string;
  reName?: string;
  cooldown?: number;
  level?: number;
  maxLevel?: number;
  useCount?: number;
  permanentBoosts?: { [key: string]: number };
  /**
   * 技能描述
   */
  desc?: string;
}

export interface panel_common {
  title: string,
  icon?: string,
  emoji: string,
  list: { key: string, val: string | number | undefined }[]
}