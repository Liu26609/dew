import {  prop_item } from "../../../../shared/protocols/shareFace";
import { Item_Type } from "../../../../shared/PtlFace";
export enum bag_getType{
    index
}
export default class bags{
    items:prop_item[] = []
    // 增加索引map
    constructor(){

    }
    _resData(data:any){
        if(!data)return;
        if(data.items){
            for (let i = 0; i < data.items.length; i++) {
                const element = data.items[i];
                this.items.push(element);
            }
        };
    }
    get_item(type:bag_getType,id:any):prop_item|undefined{
        let data;
        switch (type) {
            case bag_getType.index:
                data = this._get_item_index(id)
                break;
        
            default:
                break;
        }
        return data;
    }
    private _get_item_index(index:number){
        return this.items[index];
    }
    addItem(data:prop_item){
        switch (data.type) {
            case Item_Type.技能书:
                data.name = data.data.name;
                data.cont = 1;
                break;
            case Item_Type.装备:
                data.name = data.data.name;
                data.cont = 1;
            break;
            default:
                break;
        }
        this.items.push(data);
    }
}