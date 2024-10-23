import { ResList } from "../shared/master/player/bag/PtlList";
import { Item_Type } from "../shared/PtlFace";
import message from "../trigger/message";
declare class temp_text {
    constructor();
    /**
     * 背包列表展示
     */
    bag_list(data: ResList, cls: message): void;
    /**
     * 道具查看
     */
    prop_look(data: {
        type: Item_Type;
        temp: any;
    }, cls: message): Promise<void>;
    private temp_prop_equip;
    private temp_prop_skill;
}
declare const _default: temp_text;
export default _default;
