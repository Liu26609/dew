import message from '../trigger/message';
declare class temp_img {
    commonCss: string;
    pageContents: Map<string, string>;
    private ctx;
    constructor();
    /**
     * 读取通用css文件
     * 哈希map 全部页面
     */
    init(ctx: any): void;
    private renderTemplate;
    test(cls: message): Promise<void>;
}
declare const _default: temp_img;
export default _default;
