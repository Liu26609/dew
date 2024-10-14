const path = require('path');
import actionCfg, { matchRule } from "./cfg/actionCfg";
import common from "./lib/common";
import ET, { ET_K } from "./lib/ET";
import server from "./server";
import message from "./trigger/message";

class inputManage {
    skipMap: Map<string, boolean> = new Map();
    messageMap: Map<string, message> = new Map();
    constructor() {
        
    }
    init() {
        ET.listen(ET_K.input_message, this.input_msg.bind(this))
    }
    skip(id: string,jude:boolean) {
        if(jude){
            this.skipMap.set(id, true);
        }else{
            this.skipMap.delete(id);
        }
    }
    input_msg(cls: message) {
        if (this.skipMap.has(cls.get_userId())) {
            console.log('skip')
            return;
        }
        this.messageMap.set(cls.get_msgId(), cls);
        console.log('input_msg', cls)

        // 根据配置分析内容
        let str = cls.get_content();
        let matchCont = 0;
        for (let index = 0; index < actionCfg.length; index++) {
            const element = actionCfg[index];
            if (element.match_rule == matchRule.完全匹配) {
                if (str == element.key) {
                    ++matchCont;
                    const classPath = path.resolve(__dirname, `./action/${element.path}`);
                    common.importClass(classPath, [cls])
                }
            }
        }

        if(!matchCont){
            server.api('Miss',{},cls)
        }
    }
}
export default new inputManage();