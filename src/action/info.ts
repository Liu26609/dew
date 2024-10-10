import message from "../trigger/message";
import * as os from 'os';
export default class {
    constructor(cls: message) {
        // 获取空闲内存和总内存
        const freeMemory = os.freemem();
        const totalMemory = os.totalmem();
        const userName = cls.get_name();
        const memoryUsage = ((totalMemory - freeMemory) / totalMemory) * 100;
        cls.addLine(`来源:[${cls.platform}][${cls.jude_private() ? '群组' : '私信'}]`)
        cls.addLine(`昵称:${userName}`)
        cls.addLine(`ID:${cls.get_userId()}`)
        cls.addLine(`内存率: ${memoryUsage.toFixed(2)}%`)
        cls.send()
    }
}