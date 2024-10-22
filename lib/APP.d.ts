declare class APP {
    bodySysCfg: Map<string, Map<string, string>>;
    constructor();
    setSysCfg(cfg: any): void;
    getSysCover(s: string, k: string): string;
    checkSys(s: string): Promise<boolean>;
}
declare const _default: APP;
export default _default;
