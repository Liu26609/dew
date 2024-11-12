import message from '../../trigger/message';
import { MsgAction } from '../../shared/master/MsgAction';
import server from '../../server';
import { temp_card } from '../../temp/temp_text';
import inputManage from '../../inputManage';
export default class {
    constructor(cls: message, data: MsgAction) {
        data.delaytime = data.delaytime || 0;
        //    如果data.data 是数组
        let msgCont = 1;
        if (data.data instanceof Array) {
            msgCont = data.data.length;
                for (let i = 0; i < data.data.length; i++) {
                    const element = data.data[i];
                    let temp = new temp_card()
                    temp.set_title('系统提示', '📜')
                    const modifiedData = element.replace(/\$at/g, cls.At());
                    temp.line(modifiedData)
                    cls.send_v2(temp, data.delaytime * 1000);
                }
        } else {
            setTimeout(() => {
                let temp = new temp_card()
                temp.set_title('系统提示', '📜')
                const modifiedData = data.data.replace(/\$at/g, cls.At());
                temp.line(modifiedData)
                cls.send_v2(temp);
            }, data.delaytime * 1000);
        }
    }
}
