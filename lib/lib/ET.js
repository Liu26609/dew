const EventEmitter = require('events');
export var ET_K;
(function (ET_K) {
    /**战场创建 */
    ET_K[ET_K["battle_create"] = 0] = "battle_create";
    /**战场销毁 */
    ET_K[ET_K["battle_destroy"] = 1] = "battle_destroy";
    /**战斗结束 */
    ET_K[ET_K["battle_over"] = 2] = "battle_over";
    ET_K[ET_K["input_message"] = 3] = "input_message";
})(ET_K || (ET_K = {}));
// 创建事件管理器实例
class ET extends EventEmitter {
    constructor() {
        super();
    }
    // 监听事件
    listen(key, call) {
        this.on(key, call);
    }
    // 触发事件
    fire(key, data) {
        this.emit(key, data);
    }
    // 销毁监听
    rm(key, call) {
        this.off(key, call);
    }
}
// 导出一个 ET 的实例
export default new ET();
