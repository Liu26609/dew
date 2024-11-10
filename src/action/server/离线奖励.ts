import message from '../../trigger/message';
import { MSG_OFFLINE_REWARD, MsgAction } from '../../shared/master/MsgAction';
import server from '../../server';
import { temp_card } from '../../temp/temp_text';
import common from '../../lib/common';
import APP from '../../APP';
export default class {
    constructor(cls: message, data:MsgAction) {
        this.step(cls, data.data)
    }
    async step(cls: message, data: MSG_OFFLINE_REWARD) {
        let card = new temp_card();
        card.set_title('离线奖励', '🎁')
        card.line(`你已挂机了${APP.countdown(data.time * 1000)},以下是你的挂机奖励哦`)
        let gifts = data.reward;
        for (let index = 0; index < gifts.length; index++) {
            const element = gifts[index];
            card.add(`${element.icon}${element.name}*${element.cont}`)
        }
        cls.send_v2(card)
    }
}