import { temp_card } from "../../../temp/temp_text";
import message from "../../../trigger/message";

export default class {
    constructor(cls: message, ...data) {
        this.start(cls, ...data)
    }
    start(cls: message, ...data) {
        let card = new temp_card();
        card.set_title('借呗贷款')
        card.line('借呗是主神空间中的一种借贷方式，玩家可以通过借呗来借贷自己的消费。')
        card.add('💰总计额度:0')
        card.add('💰可用:0💰已用:0')
        card.line('11月应还:0')
        card.select(['借呗借款','借呗还款'])
        cls.send_v2(card)
    }
}