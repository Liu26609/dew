export interface _base_com {
    t?: string;
}
export interface _bar extends _base_com {
    name: string;
    key: string;
    max: number;
    now: number;
    res?: number;
    lastTime?: number;
}
export interface _line extends _base_com {
    min: number;
    max: number;
}
export interface _att_val extends _base_com {
    name: string;
    key: string;
    val: number;
}
export interface _att_line extends _base_com {
    name: string;
    key: string;
    val: _line;
}
export declare enum _att_key {
    生命 = "\u751F\u547D\u503C",
    物理攻击 = "\u7269\u7406\u653B\u51FB",
    物理防御 = "\u7269\u7406\u9632\u5FA1",
    速度 = "\u901F\u5EA6"
}
export declare enum battle_group {
    主场 = 0,
    客场 = 1
}
