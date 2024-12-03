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
        temp.set_title('我的位置', '🌍')
        temp.add(`🌍${data.name}[${data.pos[0]}-${data.pos[1]}]`)
        temp.add(`🧙世界玩家:${data.online}`)
        let list = data.list;
        temp.set_title('当前位置', '⚔️')
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            let text =`${element.name}`;
            if(element.hp[0] <= 0){
                text += `💔`
            }else if(element.hp[0] < element.hp[1]){
                text += `💖${element.hp[0] / element.hp[1] * 100}%`
            }
            temp.add(text)
        }
        temp.set_title_line('选择行动', '🔍')

        let select = data.select;
        if(select.length > 0){
            // 每行显示两个选项
            for(let i = 0; i < select.length; i += 2) {
                let firstOption = `【${select[i]}】`;
                let line = firstOption;
                
                if(i + 1 < select.length) {
                    // 计算第一个选项的实际长度
                    const firstLength = [...firstOption].length;
                    // 减少固定总长度为8个字符（减少了空格）
                    const targetLength = 8;
                    // 计算需要添加的空格数
                    const spacesNeeded = targetLength - firstLength;
                    // 添加计算好的空格
                    line += ' '.repeat(Math.max(2, spacesNeeded)) + `【${select[i + 1]}】`;
                }
                temp.add(line);
            }
        }
        cls.send_v2(temp)
    }
}