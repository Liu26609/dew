declare class APP {
    bodySysCfg: Map<string, Map<string, string>>;
    constructor();
    setSysCfg(cfg: any): void;
    getSysCover(s: string, k: string): string;
    checkSys(s: string): Promise<boolean>;
    /**
     * 将数字转为中文
     * 1000 -> 1千
     * 10000 -> 1万
     * 100000000 -> 1亿
     * @param number
     * @returns
     */
    numberToChinese(number: number): string;
}
declare const _default: APP;
export default _default;
