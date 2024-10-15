import { body_base } from "../../unity/base/body_base";
import { unity } from "../../unity/unity";
import { SKILL } from "../SKILL";

export class effect {
    data: any
    tag: string[]
    constructor(tag: string[], data: any) {
        this.tag = tag;
        this.data = data;
    }
    /**
     * 效果生效
     */
    active(sk:SKILL,use:body_base,tag:body_base,cont:number = 1){

    }
    get_val(use:body_base){
        let val_str = this.data.val_str;
        // 将val_str按计算符号分割
        let val_arr = val_str.split(/(\+|\-|\*|\/)/);
        for (let i = 0; i < val_arr.length; i++) {
            const element = val_arr[i];
            // 如果element是数字，则跳过
            if (!isNaN(element)) {
                continue;
            }
            // 如果element是计算符号，则跳过/(\+|\-|\*|\/)/
            if (/(\+|\-|\*|\/)/.test(element)) {
                continue;
            }
            let line = use.get_att(element);
            //    如果line是undefined，则直接替换为0
            if (!line) {
                val_str = val_str.replace(element, '0');
                continue;
            }
            let val = line.getVal();
            val_str = val_str.replace(element, val.toString());
        }
        let calculateVal = new Function('val_str', `return ${val_str}`);
        let val = calculateVal(val_str);
        return val;
    }
}