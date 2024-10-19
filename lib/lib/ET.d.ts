declare const EventEmitter: any;
export declare enum ET_K {
    /**战场创建 */
    battle_create = 0,
    /**战场销毁 */
    battle_destroy = 1,
    /**战斗结束 */
    battle_over = 2,
    input_message = 3
}
declare class ET extends EventEmitter {
    constructor();
    listen(key: ET_K, call: (data: any) => void): void;
    fire(key: ET_K, data: any): void;
    rm(key: ET_K, call: (data: any) => void): void;
}
declare const _default: ET;
export default _default;
