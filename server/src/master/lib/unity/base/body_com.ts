import { _att_key } from "../../../../shared/protocols/shareFace";
import common from "../../common";
import { _att_line, _att_val, _bar, _base_com, _line } from "../../face/FACE_BODY"
export class _bodyCom implements _base_com {
    t: string;
    constructor() {
        this.t = this.constructor.name;
    }
}
/**
 * 属性:进度条
 */
export class body_bar extends _bodyCom implements _bar {
    name: string = '?';
    key: string = '?';
    max: number = 100
    now: number = 0
    lastTime: number = Date.now();
    constructor(data: _bar) {
        super()
        try {
        this.name = data.name || data.key;
            
        } catch (error) {
            debugger
        }
        this.key = data.key || this.key;
        this.max = data.max || this.max;
        this.now = data.now || this.now;
        this.lastTime = data.lastTime || Date.now();
    }
    getVal(){
        return this.now
    }
    setVal(val:number){
        this.now = val;
    }
    getMax(){
        return this.max
    }
    setMax(val:number){
        this.max = val;
    }
}
export class body_line extends _bodyCom implements _line {
    min: number = 0;
    max: number = 0;
    constructor() {
        super()
    }
    getVal(){
        return common.random(this.min,this.max)
    }
}
/**
 * 属性:数值范围
 */
export class att_line extends _bodyCom implements _att_line {
    // 索引名称
    name: string;
    key: string;
    val: body_line = new body_line();
    constructor(data:_att_line) {
        super()
        this.name = data.name;
        this.key = data.key;

    }
    getVal(){
        return this.getVal()
    }
    setVal(val:number){
        console.log('setVal:范围类属性无法设置val',val)
    }
}

/**
 * 属性:数值
 */
export class att_val extends _bodyCom implements _att_val {
    name?: string;
    key: _att_key;
    val: number;
    hide?: boolean | undefined = false;
    constructor(data:_att_val) {
        super();
        this.name = data.name ||data.key;
        this.key = data.key;
        this.val = data.val || 0;
        this.hide = data.hide || this.hide;
    }
    getVal(){
        return this.val
    }
    setVal(val:number | undefined){
        if(typeof(val) != 'number'){
            return;
        }
        this.val = val;
    }
}