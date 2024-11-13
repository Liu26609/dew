import { temp_card } from "../../../temp/temp_text";
import message from "../../../trigger/message";

export default class {
    constructor(cls: message, ...data) {
        this.start(cls, ...data)
    }
    start(cls: message, ...data) {
        let card = new temp_card();
        card.set_title('主神银行')
        card.line('主神银行是主神空间中存放玩家资产的地方，玩家可以通过银行进行资产的存储、转移、借贷等操作。')
        card.line('💰银行余额:0(昨日收益:999)')
        card.select(['存入', '取出'])
        cls.send_v2(card)
    }
}