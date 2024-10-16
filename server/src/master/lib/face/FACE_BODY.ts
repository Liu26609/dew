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
    生命 = '生命值',
    经验值 = '经验值',
    等级 = '等级',
    物理攻击 = '物理攻击',
    物理防御 = '物理防御',
    速度 = '速度',
    暴击率 = '暴击率',
}
export enum battle_group {
    主场,
    客场,
}
export enum Item_Type{
    技能书,
    装备,
    货币,
    经验,
}