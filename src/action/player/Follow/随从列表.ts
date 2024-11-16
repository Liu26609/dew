import common from "../../../lib/common";
import server from "../../../server";
import { temp_card } from "../../../temp/temp_text";
import message from "../../../trigger/message"



export default class {
    constructor(cls: message) {
        this.start(cls);
    }

    async start(cls: message) {
        let req = await server.api('player/follow/List', {}, cls)
        if (!req) {
            return
        }
        let card = new temp_card()
        card.set_title('我的随从')
        if (req.upBattle) {
            card.add(`[上阵中]🔥${req.upBattle.fight}${req.upBattle.name}`)
        }
        card.set_title_line('随从列表')
        for (let i = 0; i < req.list.length; i++) {
            if (req.upBattle && req.list[i].uuid == req.upBattle.uuid) {
                continue
            }
            card.add(`[${i + 1}]🔥${req.list[i].fight}${req.list[i].name}`)
        }
        cls.send_v2(card)
    }
}