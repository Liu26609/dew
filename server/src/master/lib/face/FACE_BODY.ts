export interface _base_com{
    t?:string
}
export interface _bar extends _base_com{
    name: string
    key: string
    max:number,
    now:number,
    lastTime?:number
}
export interface _line extends _base_com{
    min:number,
    max:number
}
export interface _att_val extends _base_com{
    name:string,
    key:string,
    val:number
}
export interface _att_line extends _base_com{
    name:string,
    key:string,
    val:_line
}
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
export enum battle_group {
    主场,
    客场,
}
