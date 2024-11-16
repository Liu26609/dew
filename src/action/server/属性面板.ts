import message from '../../trigger/message';
import { MSG_ATT_INFO, MsgAction } from '../../shared/master/MsgAction';
import temp_img from '../../temp/temp_img';
export default class {
    constructor(cls: message, data:MsgAction) {
        this.step(cls, data.data)
    }
    async step(cls: message, data: MSG_ATT_INFO) {
        temp_img.temp_att_info(data,cls)
    }
}