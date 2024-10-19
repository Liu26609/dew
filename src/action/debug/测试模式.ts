import { CFG } from "../..";
import common from "../../lib/common";
import message from "../../trigger/message"
const _path = require('path');
export default class {
    constructor(cls: message,path) {
        if (!CFG.调试模式) {
            console.log('调试模式关闭中')
            return;
        }
        if(!path){
            console.log('没有输入调试路径')
            return
        }
        const classPath = _path.resolve(__dirname, `./${path}`);
        common.importClass(classPath, [cls]);
    }
}