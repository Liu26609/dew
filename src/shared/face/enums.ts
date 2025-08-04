// 日志类型
export enum LogType {
    伤害 = 'damage',
    治疗 = 'healing',
    护盾 = 'shield',
  }
  // 技能目标类型
  export enum TargetType {
    我方不含自己 = 'ally',
    我方 = 'ally_self',
    敌方 = 'enemy',
    自己 = 'self'
  }
  // 技能类型
  export enum SkillType {
    主动技能 = '主动技能',
    被动技能 = '被动技能',
    光环技能 = '光环技能'
  }
  // 被动触发时机
  export enum PassiveTriggerType {
    回合结束时 = '回合结束时',
    受到伤害时 = '受到伤害时',
    受到普通攻击时 = '受到普通攻击时',
  }
  // 技能分类
  export enum EffectClassType {
    攻击型 = '攻击型',
    辅助型 = '辅助型',
    防御型 = '防御型',
    工具型 = '工具型',
    全能型 = '全能型',
    控制型 = '控制型',
    回复型 = '回复型',
    增益型 = '增益型',
    减益型 = '减益型',
    治疗型 = '治疗型',
  }


  export enum EquipAttType {
    魔法传说 = '魔法传说类',
    科技类 = '科技类',
    辅助类 = '辅助类',
    娱乐类 = '娱乐类',
  }
  // RPG相关枚举迁移自index.ts和rpg/types/index.ts

export enum ItemType {
  资源 = 'prop_资源',
  装备 = 'equipment',
  道具 = 'prop_道具',
  技能书 = 'skill_book',
  宠物蛋 = 'pet_egg',
  血统卷轴 = 'talent_book',
  盲盒 = 'prop_盲盒',
  形象卡 = 'image_card',
<<<<<<< HEAD
  消耗品 = 'prop_消耗品',
=======
>>>>>>> 93d34f4776c71109a4f6fc4f0db980551a74bc73
}

/**
 * 排行榜类型
 */
export enum RankingType {
  等级 = '等级',
  金币 = '金币',
  签到 = '签到次数',
  战力 = '战力'
}
export enum quality {
  F,
  D,
  C,
  B,
  A,
  S,
  SS,
  SSS,
  SR,
  SSR,
}

export enum qualityName {
  F = '普通',
  D = '高级',
  C = '稀有',
  B = '神器',
  A = '史诗',
  S = '传说',
  SS = '神话',
  SSS = '至尊',
  SR = '永恒',
  SSR = '太初',
}

export enum qualityGradient {
  F = 'linear-gradient(to bottom, #C0C0C0, #808080)',
  D = 'linear-gradient(to bottom, #8B4513, #654321)',
  C = 'linear-gradient(to bottom, #32CD32, #228B22)',
  B = 'linear-gradient(to bottom, #4169E1, #0000CD)',
  A = 'linear-gradient(to bottom, #9370DB, #4B0082)',
  S = 'linear-gradient(to bottom, #FFD700, #FFA500)',
  SS = 'linear-gradient(to bottom, #FF4500, #DC143C)',
  SSS = 'linear-gradient(to bottom, #FF1493, #C71585)',
  SR = 'linear-gradient(to bottom, #00CED1, #008B8B)',
  SSR = 'linear-gradient(to bottom, #FF69B4, #FF1493)',
}

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

export enum 资源枚举 {
  经验 = '经验值',
  金币 = '金币',
  血统经验 = '血统经验',
}

export enum 道具枚举 {
  改名卡 = '1',
  精灵球 = '2',
  复活币 = '3',
}

export enum 盲盒枚举 {
  测试武器 = '3',
}

export enum Attribute_base {
  物理攻击 = '物理攻击',
  最大生命值 = '最大生命值',
  生命恢复 = '生命恢复',
  物理防御 = '物理防御',
  魔法攻击 = '魔法攻击',
  魔法防御 = '魔法防御',
  物理穿透 = '物理穿透',
  魔法穿透 = '魔法穿透',
  暴击率 = '暴击率',
  闪避率 = '闪避率',
  魔法暴击率 = '魔法暴击率',
  物理暴击率 = '物理暴击率',
  技能缩减 = '技能缩减',
}

export enum attackKey {
  普通攻击 = '普通攻击',
  物理攻击 = '物理攻击',
  魔法攻击 = '魔法攻击',
  真实攻击 = '真实攻击',
  恢复生命 = '恢复生命',
  护盾 = '护盾'
}

export enum defenseKey {
  物理防御 = '物理防御',
  魔法防御 = '魔法防御'
}

export enum effectKey {
  伤害类_普通攻击 = '伤害类_普通攻击',
  伤害类_物理伤害 = '伤害类_物理伤害',
  伤害类_魔法伤害 = '伤害类_魔法伤害',
  伤害类_真实伤害 = '伤害类_真实伤害',
  辅助类_生命回复 = '辅助类_生命回复',
  辅助类_护盾 = '辅助类_护盾',
  辅助类_属性提升 = '辅助类_属性提升',
  工具类_添加buff = '添加buff'
}

export enum ConditionType {
  生命值百分比 = '生命值百分比',
  生命值绝对值 = '生命值绝对值',
  回合数 = '回合数',
  技能冷却 = '技能冷却',
  目标数量 = '目标数量',
  自身状态 = '自身状态',
  敌方状态 = '敌方状态',
  随机概率 = '随机概率',
  属性值 = '属性值',
  始终触发 = '始终触发'
}

export enum ConditionOperator {
  大于 = '大于',
  小于 = '小于',
  等于 = '等于',
  大于等于 = '大于等于',
  小于等于 = '小于等于',
  不等于 = '不等于'
}