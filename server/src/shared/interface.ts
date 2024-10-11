
export enum EffectType {
    none,
    对目标造成物理伤害,
    对目标造成魔法伤害,
    恢复目标生命值,
    临时提升目标力量,
    永久增加最大生命值,
    沉默单体,
    屏障,
    buff_提升物理吸血,
    buff_提升最大生命,
    buff_提升生命恢复,
    buff_提升最大魔法值,
    buff_提升魔法值恢复速度,
    buff_提升最大物攻,
    buff_提升最小物攻,
    buff_提升攻击速度,
    buff_提升最大魔攻,
    buff_提升最小魔攻,
    buff_提升魔法防御,
    buff_提升物理防御,
    buff_提升魔法暴击率,
    buff_提升物理暴击率,
    buff_提升魔法吸血,
    召唤永久单位,
    真实伤害,
    增加金币
}
/**
 * 需要知道
 * 这个buff来自谁
 * 挂载监听器
 * 触发执行技能回调
 *
 */
export enum BuffEffect {
    none = 'none',
    力量 = '力量',
    沉默 = '沉默',
    物理吸血 = '物理吸血',
    最大生命 = '最大生命',

    生命恢复速度 = '生命恢复速度',
    最大魔法值 = '最大魔法值',
    魔法恢复速度 = '魔法恢复速度',
    最大物攻 = '最大物攻',
    最小物攻 = '最小物攻',
    攻击速度 = '攻击速度',
    最大魔攻 = '最大魔攻',
    最小魔攻 = '最小魔攻',
    魔法防御 = '魔法防御',
    物理防御 = '物理防御',
    魔法暴击率 = '魔法暴击率',
    物理暴击率 = '物理暴击率',
    魔法吸血 = '魔法吸血'
}
export enum EffectCondition {
    无,
    目标生命值高于百分之70,

    auto_普通攻击时,
    auto_附带即生效,
    auto_受到普通攻击时,
    auto_死亡时
}
export enum Effect_tag {
    友军,
    敌人,
    上一个效果的目标,
    自己,
    无差别
}
export enum Sk_minType {
    普通攻击,
    技能
}
export enum att_preference {
    物理伤害型 = 1,
    魔法伤害型,
    混合伤害型,
    物理防御型,
    魔法防御型,
    混合防御型,
    纯血型,
    召唤型,
    宠物型,
    宠物召唤混合型,
    全能型,
    纯蓝量,
    物理攻速暴击
}
export interface bar {
    num: number
    now: number
    max: number
}
export interface face_attributes {
    /**
      * ❤生命值
      */
    Hp_Max: number;
    /**
     * 💖生命恢复速度
     */
    Hp_res: number;
    /**
     * 💧魔法值
     */
    Mp_Max: number;
    /**
     * ⏳蓝量恢复速度
     */
    Mp_res: number;
    /**
     * 🗡️最大物攻
     */
    Physical_Attack_max: number;
    /**
     * 🗡️最小物攻
     */
    Physical_Attack_min: number;
    /**
     * 🩸物理吸血
     */
    Physical_Ls: number;
    /**
     * 💥物理暴击率
     */
    Physical_crit: number;
    /**
     * 🛡️物理防御
     */
    Physical_defense: number;
    /**
     * 🔮最大魔攻
     */
    Magic_Attack_max: number;
    /**
    * ✝️魔法吸血
    */
    Magic_Ls: number;
    /**
     * ☯️魔法防御
     */
    Magic_defense: number;
    /**
     * ☪️魔法暴击率
     */
    Magic_crit: number;
    /**
    * 🔮最小魔攻
    */
    Magic_Attack_min: number;
    /**
     * ⚡️攻击速度
     */
    Attack_Speed: number;
    /**
     * ⚛️召唤数量
     */
    Calls_cont: number;
    /**
     * 🔯召唤等级最高
     */
    Calls_leveMax: number;
    /**
    * 🔯召唤等级最低
    */
    Calls_leveMin: number;
    /**
     * ⭐️召唤评分
     */
    Calls_sore: number
}
/**
 * 角色一级属性点
 */
export interface face_Points {
    /**
     * 力量 最大生命 物理攻击
     */
    a: number
    /**
     * 敏捷 普通攻击次数
     */
    c: number
    /**
     * 精神 法术强度  精神力
     */
    b: number
    /**
     * 幸运
     */
    d: number
    /**
 * 额外增加最大生命值
 */
    Hp_Max: number;
    // 白盾
    _wall_hp: number
}
/**
 * 任务标识
 */
export enum taskKey {
    击杀普通怪物,
    成功捕捉宠物,
    移动到未知位置,
    成功打开宝箱,
    签到一次,
    挂机时长,
    钓到鱼只,
    钓到鱼斤,
    砍树次
}
export enum SK_type {
    主动技能,
    被动技能
}
export enum prop_min_type {
    道具,
    属性书,
    装备,
    技能书,
    宠物蛋,
    小队邀请函,
}
/**
 * 交易凭证
 */
export interface transactionLog {
    createTime: number
    state: boolean
    gold: { need: number, now: number }
    diamond: { need: number, now: number }
    items: { name: string, need: number, now: number }[]
    reason: string
}
export enum group {
    /**
 * 战斗迎接方
 */
    主场,
    /**
     * 战斗发起方
     */
    客场

}
export interface battle_log {
    use_uuid: string,
    use_name: string,
    sk_name: string,
    group: group,
    type: EffectType,
    val: number | string
}


export interface face_prop_item {
    uuid?: string
    /**
        * 道具类型
        */
    min_type: prop_min_type;
    /**
     * 道具评分
     */
    score: number
    /**
     * 来源
     */
    from: string
    num: number;
    data: any
    icon?: string
}

export interface mail_item {
    create: number
    from: {
        uuid: string
        name: string
    }
    to: {
        uuid: string
    }
    title: string
    content: string
    /**
     * 附件 - 背包ITEM
     */
    annexs: face_prop_item[]
}

export interface round_log {
    logs: {
        a_name: string,
        b_name: string,
    }[]
    items: { name: string, cont: number }[]
}
export enum rank_type {
    等级,
    战力,
    称号资质,
    血统等级,
    天赋等级,
    血统资质,
    天赋资质,
    物攻,
    魔攻,
    魔防,
    物防,
    生命,
    金币,
    小队贡献,
    步数,
    捕捉宠物成功次数,
    宝箱成功打开次数,
    挂机时长,
    击杀怪物数量,
    基因锁等级,
    委托完成次数排行榜,
    boss击杀次数,
    签到次数,
    新手任务完成耗时,
    每日任务完成次数,
    每周任务完成次数,
    钓鱼总斤数,
    砍树次数
}
export enum rank_typeName {
    等级 = '等级排行榜',
    战力 = '战力排行榜',
    称号资质 = '称号资质榜',
    血统等级 = '血统等级榜',
    天赋等级 = '天赋等级榜',
    血统资质 = '血统资质榜',
    天赋资质 = '天赋资质榜',
    物攻 = '物攻排行榜',
    魔攻 = '魔攻排行榜',
    魔防 = '魔防排行榜',
    物防 = '物防排行榜',
    生命 = '生命排行榜',
    金币 = '金币排行榜',
    小队贡献 = '小队贡献排行榜',
    步数 = '探险大师榜',
    捕捉宠物成功次数 = '宝可梦大师榜',
    宝箱成功打开次数 = '宝箱达人榜',
    挂机时长 = '摸鱼排行榜',
    击杀怪物数量 = '肝帝刷怪榜',
    基因锁等级 = '基因锁进度榜',
    委托完成次数排行榜 = '委托达人榜',
    boss击杀次数 = 'BOSS克星榜',
    签到次数 = '签到排行榜',
    新手任务完成耗时 = '新手任务耗时榜',
    每日任务完成次数 = '日常达人榜',
    每周任务完成次数 = '周常达人榜',
    钓鱼总斤数 = '钓鱼佬排行榜',
    砍树次数 = '砍树排行榜'
}

export interface rank_item {
    uuid: string
    name: string
    type: rank_type
    num: number
    style: string
    title_style: string
}