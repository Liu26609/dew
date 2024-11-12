import server from "../../../../server";
import { Item_Type } from "../../../../shared/master/shareFace";
import temp_text, { temp_card } from "../../../../temp/temp_text";
import message from "../../../../trigger/message";

export default class {
    constructor(cls: message, ...data) {
        console.log('绑定信息', data)
        this.start(cls, ...data)
    }

    async start(cls: message, ...data) {
        let bindLogs = await server.api('bind/Pass', {code:cls.get_content()}, cls)
        
    }

}