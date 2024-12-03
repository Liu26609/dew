import server from "../../../server"
import { MSG_OPERATE, MSG_POSITION_INFO, MsgAction, transaction_create } from "../../../shared/master/MsgAction"
import temp_text, { temp_card } from "../../../temp/temp_text";
import message from "../../../trigger/message"

export default class {
    constructor(cls: message,data:MsgAction) {
        this.step(cls,data)
    }
    async step(cls: message,data:MsgAction){
        let info = data.data as MSG_OPERATE;
        let temp = new temp_card();
        temp.set_title(info.title, '🔨')
        temp.add(`「${info.res}」`)
        temp.set_title_line('操作选择', '🏧')
        temp.add('【是】         【否】')
        cls.send_v2(temp)

    }
}