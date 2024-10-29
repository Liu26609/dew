import server from "../../server"
import { temp_card } from "../../temp/temp_text"
import message from "../../trigger/message"

export default class {
    constructor(cls: message, ...data) {
        this.start(cls, ...data)
    }
    async start(cls: message, ...data) {
        if (!data || data.length == 0) {
            this.look(cls)
        }
    }
    async look(cls: message) {
        let req = await server.api('common/SetUp', { key: '', value: false }, cls)
        if (!req) { return }
        let temp = new temp_card()
        temp.set_title('个人设置', '📖')
        temp.add(`消息模式:${req.img ? '图片' : '文字'}`)

        cls.send_v2(temp)
    }
}