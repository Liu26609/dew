import message from '../../trigger/message';
import { MsgAction } from '../../shared/master/MsgAction';
import server from '../../server';
import { temp_card } from '../../temp/temp_text';
export default class {
    constructor(cls: message, data: MsgAction) {
        let temp = new temp_card()
        temp.set_title('系统提示','📜')
        const modifiedData = data.data.replace(/\$at/g, cls.At());
        temp.line(modifiedData)

        if(data.delaytime){
            setTimeout(() => {
                cls.send_v2(temp);
            }, data.delaytime * 1000);
        }else{
            cls.send_v2(temp);
        }

    }
}
