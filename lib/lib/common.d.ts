declare class common {
    constructor();
    v4(): any;
    sleep(ms: number): Promise<void>;
    random(min: number, max: number): number;
    importClass(path: string, agm?: any): any;
}
declare const _default: common;
export default _default;
