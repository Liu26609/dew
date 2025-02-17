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
        let bindLogs = await server.api('bind/Look', {}, cls)

        let card = new temp_card();
        card.set_title('绑定记录');
        card.line(`原始账号#${bindLogs.logs[0].bind_id}`)
        card.line(`我的ID#${cls.get_userId()}`)
        card.set_title_line(`新增绑定`)
        for (let index = 0; index < bindLogs.logs.length; index++) {
            const element = bindLogs.logs[index];
            card.add(`平台#${element.platform}`)
            card.add(`ID#${element.id}`)
            const date = new Date(element.time);
            card.add(`时间:${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`)
        }
        cls.send_v2(card)
    }

}