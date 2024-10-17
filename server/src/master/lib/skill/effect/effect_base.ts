import { battle } from "../../battle/battle";
import { _att_key } from "../../face/FACE_BODY";
import { SKILL_target } from "../../face/FACE_SKILL";
import { body_base } from "../../unity/base/body_base";
import { unity } from "../../unity/unity";
import { SKILL } from "../SKILL";

export class effect {
    data: any
    target: SKILL_target = SKILL_target.自己
    tag: string[]
    constructor(tag: string[], target: SKILL_target, data: any) {
        this.target = target
        this.tag = tag;
        this.data = data;
    }
    get_key() {
        return this.tag.join('_');
    }
    get_attVal(key: _att_key, tag: body_base) {
        let me = tag.get_att(key);
        let bf = tag.get_buffVal(key)
        if (me) {
            return me.getVal() + bf;
        }
        return bf;
    }
    get_target(use: body_base, tags: body_base[]) {
        let list: body_base[] = []
        switch (this.target) {
            case SKILL_target.自己:
                list = [use];
                break;
            case SKILL_target.敌人:
                list = tags;
                break;
            default:
                break;
        }
        return list;
    }
    add_buff(key: string, use: body_base, tag: body_base, val: number) {
        tag.add_buff(key, this.data.name, this.data.round, val, use);
    }
    /**
     * 效果生效
     */
    active(sk: SKILL, use: body_base, tag: body_base[], cont: number = 1,bt:battle) {

    }
    get_val(use: body_base) {
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