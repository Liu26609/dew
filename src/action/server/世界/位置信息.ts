import { MsgAction, MSG_POSITION_INFO } from "../../../shared/master/MsgAction"
import temp_img from "../../../temp/temp_img"
import { temp_card } from "../../../temp/temp_text";
import message from "../../../trigger/message"

export default class {
    constructor(cls: message, data:MsgAction) {
        this.step(cls, data.data)
    }
    async step(cls: message, data: MSG_POSITION_INFO) {
        let temp = new temp_card();
        switch (data.name) {
            case '主神空间':
                temp.set_title('主神空间', '🌌')
                temp.add(`🌍坐标${data.pos[0]}-${data.pos[1]}`)
                temp.add(`🧙世界玩家:${data.online}`)
                break;

            default:
                temp.set_title('我的位置', '🌍')
                temp.add(`🌍坐标${data.pos[0]}-${data.pos[1]}`)
                temp.line(`当前世界:${data.name}`)
                temp.add(`🧙世界玩家:${data.online}`)
                break;
        }
        let list = data.list;
        let battle = data.battle;
        temp.set_title('当前位置', '⚔️')
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            let text =`${element.name}`;
            if(element.hp[0] < element.hp[1]){
                text += `💖${element.hp[0] / element.hp[1] * 100}%`
            }
            temp.add(text)
        }
        temp.set_title_line('选择行动', '🔍')
        if(battle){
            temp.add(`【战斗】         【探索】`)
        }else{
            temp.add(`         【探索】`)
        }
        cls.send_v2(temp)
    }
}