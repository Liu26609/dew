/**
 * 多平台消息处理中间件
 */
export default class message {
    platform: string;
    temp: any[];
    session: any;
    constructor(ctx: any, p?: string);
    clear(): void;
    At(): string;
    addLine(str: string): void;
    get_name(): any;
    get_botName(): string;
    /**
     * @deprecated 暂不可用，qq 群无法群发
     */
    broadcast(): void;
    /**
     * 等待用户的下一次输入
     * @returns
     */
    wait_nextInput(t?: number): Promise<any>;
    get_userId(): any;
    get_msgId(): any;
    get_content(): any;
    jude_private(): boolean;
    send(delaytime?: number): void;
    send_v1(temp: string): void;
}
