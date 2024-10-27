import server from "../../../server"
import { MsgAction, transaction_create } from "../../../shared/master/MsgAction"
import temp_text from "../../../temp/temp_text";
import message from "../../../trigger/message"

export default class {
    constructor(cls: message,data:MsgAction) {
        this.step(cls,data)
    }
    async step(cls: message,data:MsgAction){
        let info = data.data as transaction_create;
        cls.send_v2(temp_text.transaction_create(info))
    }
}