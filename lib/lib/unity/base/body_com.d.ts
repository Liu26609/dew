import { _att_line, _att_val, _bar, _base_com, _line } from "../../face/FACE_BODY";
export declare class _bodyCom implements _base_com {
    t: string;
    constructor();
}
/**
 * 属性:进度条
 */
export declare class body_bar extends _bodyCom implements _bar {
    name: string;
    key: string;
    max: number;
    now: number;
    res: number;
    lastTime: number;
    constructor(data: _bar);
    getVal(): number;
    setVal(val: number): void;
}
export declare class body_line extends _bodyCom implements _line {
    min: number;
    max: number;
    constructor();
    getVal(): number;
}
/**
 * 属性:数值范围
 */
export declare class att_line extends _bodyCom implements _att_line {
    name: string;
    key: string;
    val: body_line;
    constructor(name: string, val?: body_line);
    getVal(): any;
    setVal(val: number): void;
}
/**
 * 属性:数值
 */
export declare class att_val extends _bodyCom implements _att_val {
    name: string;
    key: string;
    val: number;
    constructor(data: _att_val);
    getVal(): number;
    setVal(val: number): void;
}
