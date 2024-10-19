import { Item_Type, prop_item } from "../../../shared/shareFace";

export default class bags{
    items:prop_item[] = []
    // 增加索引map
    constructor(){

    }
    _resData(data:any){
        if(!data)return;
        if(data.items){this.items = data.items};
    }
    addItem(data:prop_item){
        switch (data.type) {
            case Item_Type.技能书:
                data.name = data.data.name;
                data.cont = 1;
                break;
        
            default:
                break;
        }
        this.items.push(data);
    }
}