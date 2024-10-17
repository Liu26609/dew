declare class battleText {
    constructor();
    /**
     * 获得战斗数据文本
     */
    getData(data: any): string;
    /**
     * 获取技能统计
     */
    getSkLog(data: any): string;
    /**
     * 获取击杀日志
     */
    getKillLog(data: any): string;
}
declare const _default: battleText;
export default _default;
