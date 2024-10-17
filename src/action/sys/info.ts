import * as os from 'os';
import message from '../../trigger/message';
export default class {
    constructor(cls: message) {
        // 获取空闲内存和总内存
        const freeMemory = os.freemem();
        const totalMemory = os.totalmem();
        const userName = cls.get_name();
        const memoryUsage = ((totalMemory - freeMemory) / totalMemory) * 100;
        cls.addLine(`[from]${cls.platform}-[${cls.jude_private() ? '群组' : '私信'}]`)
        cls.addLine(`[bot]${cls.get_botName()}`)
        cls.addLine(`[user]${userName}-${cls.get_userId()}`)
        cls.addLine(`内存率: ${memoryUsage.toFixed(2)}%`)
        cls.send()
    }
}