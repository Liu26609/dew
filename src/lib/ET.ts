const EventEmitter = require('events');
export enum ET_K{
    /**战场创建 */
    battle_create,
    /**战场销毁 */
    battle_destroy,
    /**战斗结束 */
    battle_over,
    input_message,
}
// 创建事件管理器实例
class ET extends EventEmitter {
    constructor() {
        super();
    }

    // 监听事件
    listen(key: ET_K, call: (data: any) => void) {
        this.on(key, call);
    }

    // 触发事件
    fire(key: ET_K, data: any) {
        this.emit(key, data);
    }

    // 销毁监听
    rm(key: ET_K, call: (data: any) => void) {
        this.off(key, call);
    }
}

// 导出一个 ET 的实例
export default new ET();
