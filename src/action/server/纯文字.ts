import message from '../../trigger/message';
import { MsgAction } from '../../shared/master/MsgAction';
export default class {
    constructor(cls: message, data: MsgAction) {
        data.delaytime = data.delaytime || 0;
        //    如果data.data 是数组
        if (data.data instanceof Array) {
            for (let i = 0; i < data.data.length; i++) {
                const element = data.data[i];
                const modifiedData = element.replace(/\$at/g, cls.At());
                cls.send_v1(modifiedData, data.delaytime * 1000);
            }
        } else {
            const modifiedData = data.data.replace(/\$at/g, cls.At());
            cls.send_v1(modifiedData, data.delaytime * 1000);
        }

    }
}
