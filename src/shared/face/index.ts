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
//品质
export enum qualityName {
  F = '普通',
  D = '高级',
  C = '稀有',
  B = '神器',
  A = '史诗',
  S = '传说',
  // 常规顶级
  SS = '神话',
  SSS = '至尊',
  SR = '永恒',
  SSR = '太初',
}
// 品质渐变颜色 - 参考DNF品质颜色系统
export enum qualityGradient {
  F = 'linear-gradient(to bottom, #C0C0C0, #808080)',    // 普通白色渐变
  D = 'linear-gradient(to bottom, #8B4513, #654321)',    // 普通棕色渐变
  C = 'linear-gradient(to bottom, #32CD32, #228B22)',    // 高级绿色渐变
  B = 'linear-gradient(to bottom, #4169E1, #0000CD)',    // 稀有蓝色渐变
  A = 'linear-gradient(to bottom, #9370DB, #4B0082)',    // 神器紫色渐变
  S = 'linear-gradient(to bottom, #FFD700, #FFA500)',    // 史诗橙色渐变
  SS = 'linear-gradient(to bottom, #FF4500, #DC143C)',   // 传说红色渐变
  SSS = 'linear-gradient(to bottom, #FF1493, #C71585)',  // 神话粉色渐变
  SR = 'linear-gradient(to bottom, #00CED1, #008B8B)',   // 特殊青色渐变
  SSR = 'linear-gradient(to bottom, #FF69B4, #FF1493)',  // 超稀有热粉色渐变
}

/**
 * 排序枚举
 */
export enum sort_type {
  
  time_up = '时间↑',
  time_down = '时间↓',
  price_down = '价格↓',
  price_up = '价格↑',
  quality_up = '品质↑',
  quality_down = '品质↓',
  count_up = '数量↑',
  count_down = '数量↓',
}
export interface panel_common{
  title:string,
  icon?:string,
  emoji:string,
  list:{key:string,val:string|number|undefined}[]
}