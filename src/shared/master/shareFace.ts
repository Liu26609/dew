import { quality } from "./face_master"

export interface prop_item_equip {
  name: string
  // 基础属性
  att: any
  sys: string
  fight: number
  type: string
  type_hide:string[]
  leve_strengthen: _bar
  desc: string
  quality: quality
  from: any
}
export interface _base_com {
  t?: string
}
export interface _bar extends _base_com {
  name?: string
  key: string
  max: number,
  now: number,
}
export interface _line extends _base_com {
  min: number,
  max: number
}
export interface _att_val extends _base_com {
  name?: string,
  key: _att_key,
  val: number,
  hide?: boolean

}
export interface _att_line extends _base_com {
  name: string,
  key: string,
  val: _line;
}

export enum battle_group {
  主场,
  客场,
}
export enum SKILL_type {
  主动技能,
  被动技能
}
export enum Item_Type {
  技能书,
  装备,
  道具,
  none,
}
export interface prop_item_skill {
  /**技能名称 */
  name: string;
  /**
   * 技能cd
   */
  cd: number;
  /**
   * 0 主动技能,
   * 1 被动技能
   */
  type: SKILL_type;
  /**技能描述 */
  desc: string;
  style_id:string;
  /**技能等级 */
  leve: number;
  leve_exp: _bar;
}
export interface prop_item {
  name: string
  // 自识别是否可叠加
  type: Item_Type
  icon?: string
  cont: number
  data?: any;
}
export enum body_sys {
  修真 = '修真',
  // 
  斗罗 = '斗罗',
  // 百级魂师‌
  魔法 = '魔法',
  科幻 = '科幻',
  玄幻 = '玄幻',
  火影忍者 = '火影忍者',
  // 普通巫师、终极巫师
}

// 定义属性权重
export const attributeWeights = {
  生命值: 0.5,
  生命恢复: 0.3,
  魔法值: 0.4,
  魔法恢复: 0.2,
  等级: 1.0,
  物理攻击: 0.8,
  魔法攻击: 0.7,
  物理防御: 0.6,
  魔法防御: 0.5,
  技能急速: 0.4,
  物理暴击率: 0.9,
  魔法暴击率: 0.9,
  物理护盾: 0.5,
  魔法护盾: 0.5,
  生命护盾: 0.5,
};
export enum _att_key {
  战斗力 = '战斗力',
  生命值 = '生命值',
  生命恢复 = '生命恢复',
  魔法值 = '魔法值',
  魔法恢复 = '魔法恢复',
  等级 = '等级',
  经验值 = '经验值',
  物理攻击 = '物理攻击',
  魔法攻击 = '魔法攻击',
  物理防御 = '物理防御',
  魔法防御 = '魔法防御',
  技能急速 = '技能急速',

  物理暴击率 = '物理暴击率',
  魔法暴击率 = '魔法暴击率',
  物理护盾 = '物理护盾',
  魔法护盾 = '魔法护盾',
  生命护盾 = '生命护盾'
}

export interface taskData {
  name: string;
  desc: string;
  // 任务条件
  condition: {
    /**
     * 任务说明
     */
    desc: string,
    // 任务类型
    type: string,
    // 任务目标
    target: any,
    // 任务进度
    progress: number,
  }[];
  // 是否完成
  isComplete: boolean;
  // 是否领取奖励
  isReward: boolean;
  // 任务奖励
  reward: prop_item[];
  // 任务结束倒计时
  endtime: number;
  // 是否标记删除
  del?: boolean
}
export enum bag_getType {
  index,
  name
}
export interface _user_cfg {
  /**是否开启图片模式 */
  img: boolean
}