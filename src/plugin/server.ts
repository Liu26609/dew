import { HttpClient, WsClient } from "tsrpc";
import { ServiceType, serviceProto } from "../shared/protocols/serviceProto";
import { Context } from "koishi";
import { console } from "./console";
import { Config } from "..";
class server extends console{
    private httpClient!: HttpClient<ServiceType>;
    private apiUrl!: string;
    private wsClient!: WsClient<ServiceType>;
    _init: boolean = false;
    constructor() {
        super()
    }
    init(ctx: Context,config: Config) {
        super.init(ctx,config)
        this.setWsUrl(`${config.服务器地址}:3000`)
        ctx.on('dispose', () => {
            // 修复热重载 监听残留
            this.dispose()
        })
    }
    // 卸载
    async dispose() {
        this.log('卸载:server')
        this._init = false;
        if (this.wsClient) {
            this.wsClient.unlistenMsgAll(/.*/);
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
                this.log('开始断线重连')
            }
            // Bot_client.emit(Emitter_bot.server_off);
            return v;
        })
    }
    private async connect() {
        let res = await this.wsClient.connect();
        if (!res.isSucc) {
            this.log('重试断线准备重连');
            setTimeout(async () => {
                this.connect()
            }, 5000)
        } else {
            this.log('断线重连成功');
        }
        return res;
    }
    lisentMsg<T extends keyof ServiceType['msg']>(msgName: T | RegExp, handler: any, self: any) {
        return this.wsClient.listenMsg(msgName, ((data: any) => { handler.call(self, data) }))
    }
    async setWsUrl(link: string) {
        this.log(`server link:${link}`)
        this._init = true;
        return new Promise(async (resolve, reject) => {
            this.apiUrl = link;
            if (this.wsClient) {
                this.wsClient.unlistenMsgAll(/.*/);
                this.wsClient.disconnect();
            }

            this.wsClient = new WsClient(serviceProto, { server: this.apiUrl });
            const connect = await this.wsClient.connect();
            // this.flowsToken(this.wsClient);
            this.flowsResConnect(this.wsClient);
            if (connect.isSucc) {
                this.log('服务器连接成功')
                resolve(true)
            } else {
                this.log('服务器ws连接失败', connect.errMsg)
                reject(connect.errMsg)
            }
        })
    }
    async api<T extends keyof ServiceType['api']>(apiName: T, posData: ServiceType['api'][T]['req']): Promise<ServiceType['api'][T]['res'] | undefined> {
        let client = this.wsClient || this.httpClient;
        let start = Date.now()
        let req = await client.callApi(apiName, posData);
        if (req.isSucc) {
            this.log('apiReq', apiName, (Date.now() - start) / 1000, 's')
            return req.res;
        } else {
            this.log('请求出错', apiName, req.err.message)
        }
    }
}
export default new server();