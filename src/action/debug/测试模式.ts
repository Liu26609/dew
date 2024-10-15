import { CFG } from "../..";
import common from "../../lib/common";
import message from "../../trigger/message"
const path = require('path');
export default class {
    constructor(cls: message) {
        if (!CFG.调试模式) {
            console.log('调试模式关闭中')
            return;
        }
        // (ctx.config as Config).调试模式
        let str = cls.get_content();
        str = str.replace('debug', '')
        const classPath = path.resolve(__dirname, `./${str}`);
        common.importClass(classPath, [cls]);
    }
}