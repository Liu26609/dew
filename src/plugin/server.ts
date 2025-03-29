import { HttpClient, WsClient } from "tsrpc";
import { ServiceType, serviceProto } from "../shared/protocols/serviceProto";
import { Context } from "koishi";
class server {
    private httpClient!: HttpClient<ServiceType>;
    private apiUrl!: string;
    private wsClient!: WsClient<ServiceType>;
    init: boolean = false;
    constructor() {

    }
    start(ctx: Context) {
        ctx.on('dispose', () => {
            // 修复热重载 监听残留
            this.dispose()
        })
    }
    // 卸载
    async dispose() {
        console.info('卸载:server')
        this.init = false;
        if (this.wsClient) {
            this.wsClient.unlistenMsgAll();
            this.wsClient.disconnect();
        }
    }
    /**
 * 设置服务器地址
 * @param link 
 */
    async setApiUrl(link: string) {
        return new Promise((resolve, reject) => {
            this.apiUrl = `${link}`;
            this.httpClient = new HttpClient(serviceProto, { server: this.apiUrl });
            this.flowsToken(this.httpClient);

            resolve(true)
        })
    }
    private flowsToken(client: WsClient<any> | HttpClient<any>) {
        client.flows.preApiReturnFlow.push((v) => {
            if (v.return.isSucc) {
                if (v.return.res.__token) {
                    // tokenMap.set('_token', v.return.res.__token)
                }
            }
            return v;
        })
    }
    private flowsResConnect(client: WsClient<any>) {
        client.flows.postDisconnectFlow.push((v: { isManual: any; }) => {
            if (!v.isManual) {
                this.connect()
                console.info('开始断线重连')
            }
            // Bot_client.emit(Emitter_bot.server_off);
            return v;
        })
    }
    private async connect() {
        let res = await this.wsClient.connect();
        if (!res.isSucc) {
            console.info('重试断线准备重连');
            setTimeout(async () => {
                this.connect()
            }, 5000)
        } else {
            console.info('断线重连成功');
        }
        return res;
    }
    lisentMsg<T extends keyof ServiceType['msg']>(msgName: T | RegExp, handler: any, self: any) {
        return this.wsClient.listenMsg(msgName, ((data: any) => { handler.call(self, data) }))
    }
    async setWsUrl(link: string) {
        console.info(`server link:${link}`)
        this.init = true;
        return new Promise(async (resolve, reject) => {
            this.apiUrl = link;
            this.wsClient = new WsClient(serviceProto, { server: this.apiUrl });
            const connect = await this.wsClient.connect();
            // this.flowsToken(this.wsClient);
            this.flowsResConnect(this.wsClient);
            if (connect.isSucc) {
                console.info('服务器连接成功')
                resolve(true)
            } else {
                console.error('服务器ws连接失败', connect.errMsg)
                reject(connect.errMsg)
            }
        })
    }
    async api<T extends keyof ServiceType['api']>(apiName: T, posData: ServiceType['api'][T]['req']): Promise<ServiceType['api'][T]['res'] | undefined> {
        let client = this.wsClient || this.httpClient;
        let req = await client.callApi(apiName, posData);
        if (req.isSucc) {
            console.log('apiReq', apiName, req.res)
            return req.res;
        } else {
            console.info('请求出错', apiName, req.err.message)
        }
    }
}
export default new server();