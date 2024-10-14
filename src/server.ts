import { HttpClient, WsClient } from "tsrpc";
import { ServiceType, serviceProto } from "./shared/master/serviceProto";
import { logger } from ".";
import message from "./trigger/message";
class server {
    private httpClient!: HttpClient<ServiceType>;
    private apiUrl!: string;
    private wsClient!: WsClient<ServiceType>;
    constructor() {

    }
    /**
 * 设置服务器地址
 * @param link 
 */
    async setApiUrl(link: string) {
        return new Promise((resolve, reject) => {
            this.apiUrl = `http://${link}`;
            this.httpClient = new HttpClient(serviceProto, { server: this.apiUrl });
            this.flowsToken(this.httpClient);

            resolve(true)
        })
    }
    private flowsToken(client: WsClient<any> | HttpClient<any>) {
        client.flows.preApiReturnFlow.push(v => {
            if (v.return.isSucc) {
                if (v.return.res.__token) {
                    // tokenMap.set('_token', v.return.res.__token)
                }
            }
            return v;
        })
    }
    private flowsResConnect(client: WsClient<any>) {
        client.flows.postDisconnectFlow.push(v => {
            if (!v.isManual) {
                this.connect()
                console.log('开始断线重连')
            }
            // Bot_client.emit(Emitter_bot.server_off);
            return v;
        })
    }
    private async connect() {
        let res = await this.wsClient.connect();
        if (!res.isSucc) {
            console.log('重试断线重连失败2秒后开始重试');
            setTimeout(async () => {
                this.connect()
            }, 2000)
        } else {
            console.log('断线重连成功');
        }
        return res;
    }
    lisentMsg<T extends keyof ServiceType['msg']>(msgName: T | RegExp, handler: any, self) {
        return this.wsClient.listenMsg(msgName, ((data) => { handler.call(self, data) }))
    }
    async setWsUrl(link: string) {
        logger.info(`server link:${link}`)
        return new Promise(async (resolve, reject) => {
            this.apiUrl = link;
            this.wsClient = new WsClient(serviceProto, { server: this.apiUrl });
            const connect = await this.wsClient.connect();
            // this.flowsToken(this.wsClient);
            this.flowsResConnect(this.wsClient);
            if (connect.isSucc) {
                logger.info('服务器连接成功')
                resolve(true)
            } else {
                logger.error('服务器ws连接失败', connect.errMsg)
                reject(connect.errMsg)
            }
        })
    }
    async api<T extends keyof ServiceType['api']>(apiName: T, posData: ServiceType['api'][T]['req'], msg?: message): Promise<ServiceType['api'][T]['res'] | undefined> {
        let client = this.wsClient || this.httpClient;
        if (msg) {
            posData = Object.assign(posData, {
                _onlyid:msg.get_userId(),
                _messageid: msg.get_msgId(),
                _platform: msg.platform
            });
        }
        let req = await client.callApi(apiName, posData);
        if (req.isSucc) {
            return req.res;
        } else {
            console.error('请求出错',apiName, req.err.message)
        }

    }
}
export default new server();