const path = require('path');
import actionCfg, { matchRule } from "./cfg/actionCfg";
import common from "./lib/common";
import ET, { ET_K } from "./lib/ET";
import message from "./trigger/message";

class inputManage {
    constructor() {

    }
    init() {
        ET.listen(ET_K.input_message, this.input_msg)
    }
    input_msg(cls: message) {
        console.log('input_msg', cls)
        // 根据配置分析内容
        let str = cls.getContent();
        for (let index = 0; index < actionCfg.length; index++) {
            const element = actionCfg[index];
            if (element.match_rule == matchRule.完全匹配) {
                if (str == element.key) {
                    const classPath = path.resolve(__dirname, `./action/${element.path}`);
                    common.importClass(classPath, [cls])
                }
            }
        }
    }
}
export default new inputManage();