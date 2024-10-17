export interface _base_com{
    t?:string
}
export interface _bar extends _base_com{
    name: string
    key: string
    max:number,
    now:number,
    res?:number,
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
    生命 = '生命值',
    物理攻击 = '物理攻击',
    物理防御 = '物理防御',
    速度 = '速度',
    暴击率 = '暴击率',
}
export enum battle_group {
    主场,
    客场,
}