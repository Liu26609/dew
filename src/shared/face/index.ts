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
export enum ItemType {
  资源 = 'prop_资源',
  // 装备
  装备 = 'equipment',
  // 消耗品
  道具 = 'prop_道具',
  // 消耗品 - 不可叠加
  技能书 = 'skill_book',
  // 宠物蛋
  宠物蛋 = 'pet_egg',
  // 血统卷轴
  血统卷轴 = 'talent_book',
  // 盲盒
  盲盒 = 'prop_盲盒',
  // 形象卡
  形象卡 = 'image_card',
}
export enum UserLevel {
  玩家 = 0,
  赞助会员 = 1,
  管理员 = 2,
  开发者 = 3,
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

export enum EquipAttType {
  魔法传说 = '魔法传说类',
  科技类 = '科技类',
  辅助类 = '辅助类',
  娱乐类 = '娱乐类',
}

//品质
export enum quality {
  F,
  D,
  C,
  B,
  A,
  S,
  // 常规顶级
  SS,
  SSS,
  SR,
  SSR,
}

export enum qualityColor {
  F = '#8B8B8B',    // 灰色
  D = '#A0522D',    // 棕色
  C = '#32CD32',    // 绿色
  B = '#4169E1',    // 蓝色
  A = '#9370DB',    // 紫色
  S = '#FFD700',    // 金色
  SS = '#FF4500',   // 橙红色
  SSS = '#FF1493',  // 深粉色
  SR = '#00CED1',   // 深青色
  SSR = '#FF69B4',  // 热粉色
}


