
export enum SKILL_type {
  主动技能,
  被动技能
}
export enum Item_Type{
  经验,
  技能书,
  装备,
  道具,
  none,
}
export interface prop_item{
  name:string 
  // 自识别是否可叠加
  type:Item_Type
  cont?:number
  data?;
}
export enum body_sys{
  修仙 = '修仙',
  // 
  斗罗 = '斗罗',
  // 百级魂师‌
  魔法 = '魔法',
  科幻 = '科幻',
  玄幻 = '玄幻',
  火影忍者 = '火影忍者',
  // 普通巫师、终极巫师
}
/**
 * 修仙系统允许装备 [法宝,本名法宝.]
 * 古代科技 [手枪]
 * 现代科技 [手枪]
 * 系统 + 装备类型
 * 
 * 装备类型  修仙-法宝
 * 
 * 角色: 修仙
 * 装备栏位 [法宝]
 * 如果没有 则随机一个位置装备 并且效果只生效 80% 不再附带技能
 */

export enum _att_key{
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

export interface prop_item_equip{
  // 装备名称
  name:string
  // 装备属性
  att:any
  // 体系
  sys:string
  // skill
  // 技能描述
  tips:string
}