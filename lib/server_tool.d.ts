import { ServiceType } from "./shared/tool/serviceProto";
import message from "./trigger/message";
declare class server_tool {
    private httpClient;
    private apiUrl;
    private wsClient;
    init: boolean;
    constructor();
    dispose(): Promise<void>;
    /**
 * 设置服务器地址
 * @param link
 */
    setApiUrl(link: string): Promise<unknown>;
    private flowsToken;
    private flowsResConnect;
    private connect;
    lisentMsg<T extends keyof ServiceType['msg']>(msgName: T | RegExp, handler: any, self: any): import("tsrpc-base-client").ClientMsgHandler<ServiceType, T>;
    setWsUrl(link: string): Promise<unknown>;
    api<T extends keyof ServiceType['api']>(apiName: T, posData: ServiceType['api'][T]['req'], msg?: message): Promise<ServiceType['api'][T]['res'] | undefined>;
}
declare const _default: server_tool;
export default _default;
