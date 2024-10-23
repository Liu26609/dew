import APP from "../APP";
import { ResList } from "../shared/master/player/bag/PtlList";
import { Item_Type, prop_item_equip, prop_item_skill } from "../shared/PtlFace";
import message from "../trigger/message";

class temp_text {
    constructor() {

    }
    /**
     * 背包列表展示
     */
    bag_list(data: ResList, cls: message) {
        if (!data) return;
        let temp = `背包信息\n`;
        for (let i = 0; i < data.list.length; i++) {
            const element = data.list[i];
            temp += `[${i + 1}]┃${element.name}X${element.cont}\n`
        }
        if (data.list.length == 0) {
            temp += `你的背包里什么东西都没有呢~`
        }
        cls.send_v1(temp)
    }
    /**
     * 道具查看
     */
    async prop_look(data: { type: Item_Type; temp: any }, cls: message) {
        if(!data || !data.temp){
            cls.send_v1('物品查看出错.请上报日志')
            return;
        }
        let text = '';
        switch (data.type) {
            case Item_Type.装备:
                text = await this.temp_prop_equip(data.temp)
                break;
            case Item_Type.技能书:
                text = await this.temp_prop_skill(data.temp)
                break;
            default:
                break;
        }
        cls.send_v1(text)
    }
    private async temp_prop_equip(data: prop_item_equip) {
        await APP.checkSys(data.sys);
        let text = '';
        text += `装备名称：${data.name}\n`;
        text += `装备描述：${data.tips}\n`;
        for (let i = 0; i < data.att.length; i++) {
            const element = data.att[i];
            text += `┃${APP.getSysCover(data.sys, element.name)}:${element.val}\n`
        }
        return text;
    }
    private async temp_prop_skill(data:prop_item_skill) {
        let text = '';
        text += '📜技能详情\n'
        text += `名称: ${data.name}\n`
        text += `冷却: ${data.cd}回合\n`
        text += `类型: ${data.type === 0 ? '主动技能' : '被动技能'}\n`
        text += `技能描述: ${data.desc}\n`
        return text;
    }
}
export default new temp_text();