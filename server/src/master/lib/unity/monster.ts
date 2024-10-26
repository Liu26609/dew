import { battle } from "../battle/battle";
import common from "../common";
import { body_base } from "./base/body_base";

export class monster extends body_base {
    /**
     * 怪物掉落物品表
     */
    fall: {min:number,max:number,wigth:number,name:string}[] = []
    constructor(data) {
        super()
        this.init(data)
    }
    private init(data: any) {
        this._reload(data);
    }
    set_fall(data:any){
        this.fall = data || [];
    }
}