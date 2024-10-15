const path = require('path');
import actionCfg, { matchRule } from "./cfg/actionCfg";
import common from "./lib/common";
import ET, { ET_K } from "./lib/ET";
import server from "./server";
import { MsgAction } from "./shared/master/MsgAction";
import message from "./trigger/message";

class inputManage {
    wait_inputskipMap: Map<string, boolean> = new Map();
    messageMap: Map<string, message> = new Map();
    constructor() {

    }
    init() {
        ET.listen(ET_K.input_message, this.input_msg.bind(this))
        server.lisentMsg('Action', async (data: MsgAction) => {
            console.log('收到server消息', data)
            let cls = this.messageMap.get(data.messageId)
            if (!cls) {
                console.log('server-引用消息不存在')
                return;
            }
            const classPath = path.resolve(__dirname, `./action/server/${data.template}`);
            common.importClass(classPath, [cls, data])
        }, this)
    }
    skip(id: string, jude: boolean) {
        if (jude) {
            this.wait_inputskipMap.set(id, true);
        } else {
            this.wait_inputskipMap.delete(id);
        }
    }
    input_msg(cls: message) {
        if (this.wait_inputskipMap.has(cls.get_userId())) {
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
            if (element.match_rule == matchRule.正则匹配) {
                let reg = new RegExp(element.key);
                if (reg.test(str)) {
                    ++matchCont;
                    const classPath = path.resolve(__dirname, `./action/${element.path}`);
                    common.importClass(classPath, [cls]);
                }
            }
        }

        if (!matchCont) {
            server.api('Miss', {}, cls)
        }
    }
}
export default new inputManage();