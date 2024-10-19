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
    hide?:boolean
}
export interface _att_line extends _base_com{
    name:string,
    key:string,
    val:_line
}

export enum battle_group {
    主场,
    客场,
}
