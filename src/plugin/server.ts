import { HttpClient, WsClient } from "tsrpc";
import { Context } from "koishi";
import { console } from "./console";
import { Config } from "..";
import { serviceProto, ServiceType } from "../shared/serviceProto";
class server extends console {
    private httpClient!: HttpClient<ServiceType>;
    private apiUrl!: string;
    private wsClient!: WsClient<ServiceType>;
    private ctx!: Context;
    private onConnectedCallback?: () => void;
    private messageListenerSetup: boolean = false; // 标记消息监听器是否已设置
    _init: boolean = false;
    constructor() {
        super()
    }
    async init(ctx: Context, config: Config) {
        super.init(ctx, config)
        this.ctx = ctx;

        // 设置 dispose 事件监听器
        ctx.on('dispose', () => {
            // 修复热重载 监听残留
            this.dispose()
        })

        // 确保重新初始化时先清理旧连接
        if (this.wsClient) {
            await this.dispose();
        }

        // 根据服务器环境选择对应的地址
        const serverUrlMap = {
            '测试服': 'ws://127.0.0.1:3000',
            '开发服': 'ws://dew-bot.cn:3000',
            '正式服': 'ws://dew-bot.cn:3000'
        };
        const serverUrl = serverUrlMap[config.服务器环境];

        if (!serverUrl) {
            throw new Error(`未知的服务器环境: ${config.服务器环境}`);
        }

        this.log(`选择环境: ${config.服务器环境}`)
        this.log(`尝试连接到: ${serverUrl}`)

        // 异步连接但不阻塞初始化
        this.setWsUrl(serverUrl).catch(error => {
            this.log('初始化连接失败:', error)
            this.log('请检查服务器地址是否正确，以及服务器是否正在运行')
        })
    }

    // 设置连接成功的回调
    onConnected(callback: () => void) {
        this.onConnectedCallback = callback;
        // 如果已经连接且监听器未设置，立即调用回调
        if (this._init && this.wsClient && !this.messageListenerSetup) {
            callback();
            this.messageListenerSetup = true;
        }
    }
    // 卸载
    async dispose() {
        this.log('卸载:server')
        this._init = false;
        if (this.wsClient) {
            this.wsClient.unlistenMsgAll(/.*/);
            this.wsClient.disconnect();
            // 清除对 wsClient 的引用
            this.wsClient = null as any;
        }
        // 清除回调和监听器状态
        this.onConnectedCallback = undefined;
        this.messageListenerSetup = false;
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
        if (!client || !client.flows) {
            this.log('客户端无效，无法设置断线重连');
            return;
        }
        client.flows.postDisconnectFlow.push((v: { isManual: any; }) => {
            if (!v.isManual && this._init) {
                this.connect()
                this.log('开始断线重连')
            }
            // Bot_client.emit(Emitter_bot.server_off);
            return v;
        })
    }
    private async connect() {
        if (!this._init) {
            this.log('插件已卸载，停止重连');
            return;
        }
        if (!this.wsClient) {
            this.log('WebSocket 客户端未初始化，无法重连');
            return;
        }
        let res = await this.wsClient.connect();
        if (!res.isSucc) {
            this.log('重试断线准备重连');
            if (this._init) {
                this.ctx.setTimeout(async () => {
                    this.connect()
                }, 5000)
            }
        } else {
            this.log('断线重连成功');
            // 断线重连成功时不需要重新设置监听器
        }
        return res;
    }
    lisentMsg<T extends keyof ServiceType['msg']>(msgName: T | RegExp, handler: any, self: any) {
        if (!this._init || !this.wsClient) {
            this.log('WebSocket 未连接，无法监听消息');
            return;
        }
        return this.wsClient.listenMsg(msgName, ((data: any) => { handler.call(self, data) }))
    }
    async setWsUrl(link: string, maxRetries: number = 99999) {
        this.log(`server link:${link}`)
        this._init = true;
        return new Promise(async (resolve, reject) => {
            this.apiUrl = link;
            if (this.wsClient && this.wsClient.unlistenMsgAll) {
                this.wsClient.unlistenMsgAll(/.*/);
                this.wsClient.disconnect();
            }

            this.wsClient = new WsClient(serviceProto, { server: this.apiUrl });

            let connect;
            let retryCount = 0;

            const attemptConnect = async () => {
                connect = await this.wsClient.connect();
                if (connect.isSucc) {
                    // this.flowsToken(this.wsClient);
                    if (this.wsClient) {
                        this.flowsResConnect(this.wsClient);
                    }
                    this.log('connect success')
                    // 调用连接成功的回调（仅第一次连接）
                    if (this.onConnectedCallback && !this.messageListenerSetup) {
                        this.onConnectedCallback();
                        this.messageListenerSetup = true;
                    }
                    resolve(true)
                } else {
                    retryCount++;
                    if (retryCount < maxRetries) {
                        this.log(`连接失败，${retryCount}/${maxRetries}，5秒后重试...`);
                        this.ctx.setTimeout(attemptConnect, 5000);
                    } else {
                        this.log('connect failed', connect.errMsg)
                        this._init = false; // 连接失败时设置为未初始化状态
                        reject(connect.errMsg)
                    }
                }
            };

            attemptConnect();
        })
    }
    async api<T extends keyof ServiceType['api']>(apiName: T, posData: ServiceType['api'][T]['req']): Promise<ServiceType['api'][T]['res'] | undefined> {
        if (!this._init) {
            this.log('插件未初始化，无法调用 API');
            return;
        }
        let client = this.wsClient || this.httpClient;
        if (!client) {
            this.log('客户端未连接，无法调用 API');
            return;
        }
        try {
            let start = Date.now()
            let req = await client.callApi(apiName, posData);
            if (req.isSucc) {
                this.log('apiReq', apiName, (Date.now() - start) / 1000, 's')
                return req.res;
            } else {
                this.log('请求出错', apiName, req.err.message)
            }
        } catch (error) {
            this.log('API 调用异常:', apiName, error.message)
        }
    }
}
export default new server();