import { template } from "../../../../shared/master/MsgAction";
import { prop_item } from "../../../../shared/protocols/shareFace";
import { Item_Type } from "../../../../shared/PtlFace";
import { body_base } from "./body_base";
import equip from "./equip";
export enum bag_getType {
    index,
    name
}
export default class bags {
    items: (prop_item | undefined)[] = []
    _body!: body_base;
    // 增加索引map
    constructor(body: body_base) {
        this._body = body;

    }
    _resData(data: any) {
        if (!data) return;
        if (data.items) {
            for (let i = 0; i < data.items.length; i++) {
                const element = data.items[i];
                if (element) {
                    this.items.push(element);
                }
            }
        };
    }
    get_item(type: bag_getType, id: any): prop_item | undefined {
        let data;
        switch (type) {
            case bag_getType.index:
                data = this._get_item_index(id)
                break;
            case bag_getType.name:
                data = this._get_item_name(id, Item_Type.道具)
                break;
            default:
                break;
        }
        return data;
    }
    private _get_item_index(index: number) {
        return this.items[index];
    }
    private _get_item_name(name:string,type:Item_Type) {

        for (let i = 0; i < this.items.length; i++) {
            const element = this.items[i];
            if (element && element.name == name && element.type == type) {
                return element;
            }
        }
        return undefined;
    }
    addItem(data: prop_item) {
        // 是否可叠加
        let add = false;

        switch (data.type) {
            case Item_Type.技能书:
                data.name = data.data.name;
                data.cont = 1;
                break;
            case Item_Type.装备:
                data.name = data.data.name;
                data.cont = 1;
                break;
            case Item_Type.道具:
                add = true;
                break;
            default:
                break;
        }
        if (!add) {
            this.items.push(data);
        }else{
            let item = this.get_item(bag_getType.name, data.name );
            if (!item) {
                this.items.push(data);
            } else {
                item.cont += data.cont;
            }
        }

    }
    /**
     * 移除道具
     */
    removeItem(type: bag_getType, id: any, cont: number) {
        let item = this.get_item(type, id);
        if (!item) {
            console.error('背包内没有该物品');
            return;
        }
        let itemCont = item.cont || 1;

        if (itemCont < cont) {
            cont = itemCont;
        }
        item.cont = itemCont - cont;
        if (item.cont <= 0) {
            this.items[Number(id)] = undefined;
        }
    }
    useItem(type: bag_getType, id: any, cont: number) {
        let item = this.get_item(type, id);
        let msg = '';
        if (!item) {
            console.error('背包内没有该物品');
            return '背包内没有该物品';
        }
        let itemCont = item.cont;

        if (itemCont < cont) {
            cont = itemCont;
        }
        switch (item.type) {
            case Item_Type.装备:
                let eq = new equip(item.data);
                let useJude = this._body.wearEquip(eq);
                if (useJude) {
                    this.removeItem(type, id, cont);
                }
                console.error('背包-道具装备失败')
                break;
            case Item_Type.技能书:
                let skData = item.data;
                let skJude = this._body.addSk_active(skData);
                if (skJude) {
                    this.removeItem(type, id, cont);
                }
                this._body.sendMessageg('Action', {
                    template: template.文本消息,
                    data: `[技能书使用]技能学习成功`,
                    messageId: '',
                    delaytime: 1
                })
                console.error('背包-技能学习失败')
                break;
            default:
                break;
        }

        return msg;
    }
}