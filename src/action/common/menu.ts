import { temp_card } from "../../temp/temp_text"
import message from "../../trigger/message"

export default class {
    constructor(cls:message){
        let temp = new temp_card()
        temp.set_title('基础指令', '📚')
        temp.add(`🧙[角色]查看自身相关指令`)
        temp.add(`🌎[世界]查看世界相关指令`)
        temp.add(`🛠️[设置]个性化设置`)
        temp.set_title_line('指令提示', 'ℹ️')
        temp.line('你可以对任何指令后面加上hp来查看指令的详细信息,🌰举个栗子=>[属性hp]')
        cls.send_v2(temp)
    }
}