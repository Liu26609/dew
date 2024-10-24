import message from '../../trigger/message';
import { MsgAction } from '../../shared/master/MsgAction';
import server from '../../server';
export default class {
    constructor(cls: message, data: MsgAction) {
        if(data.delaytime){
            setTimeout(() => {
                const modifiedData = data.data.replace(/\$at/g, cls.At());
                cls.addLine(modifiedData);
                cls.send();
            }, data.delaytime * 1000);
        }else{
            const modifiedData = data.data.replace(/\$at/g, cls.At());
            cls.addLine(modifiedData);
            cls.send();
        }

    }
}
