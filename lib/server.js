import { HttpClient, WsClient } from "tsrpc";
import { serviceProto } from "./shared/master/serviceProto";
import { log } from ".";
class server {
    httpClient;
    apiUrl;
    wsClient;
    init = false;
    constructor() {
    }
    // 卸载
    async dispose() {
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
    async setApiUrl(link) {
        return new Promise((resolve, reject) => {
            this.apiUrl = `http://${link}`;
            this.httpClient = new HttpClient(serviceProto, { server: this.apiUrl });
            this.flowsToken(this.httpClient);
            resolve(true);
        });
    }
    flowsToken(client) {
        client.flows.preApiReturnFlow.push(v => {
            if (v.return.isSucc) {
                if (v.return.res.__token) {
                    // tokenMap.set('_token', v.return.res.__token)
                }
            }
            return v;
        });
    }
    flowsResConnect(client) {
        client.flows.postDisconnectFlow.push(v => {
            if (!v.isManual) {
                this.connect();
                log.info('开始断线重连');
            }
            // Bot_client.emit(Emitter_bot.server_off);
            return v;
        });
    }
    async connect() {
        let res = await this.wsClient.connect();
        if (!res.isSucc) {
            log.info('重试断线重连失败2秒后开始重试');
            setTimeout(async () => {
                this.connect();
            }, 2000);
        }
        else {
            log.info('断线重连成功');
        }
        return res;
    }
    lisentMsg(msgName, handler, self) {
        return this.wsClient.listenMsg(msgName, ((data) => { handler.call(self, data); }));
    }
    async setWsUrl(link) {
        log.info(`server link:${link}`);
        this.init = true;
        return new Promise(async (resolve, reject) => {
            this.apiUrl = link;
            this.wsClient = new WsClient(serviceProto, { server: this.apiUrl });
            this.wsClient.unlistenMsgAll();
            const connect = await this.wsClient.connect();
            // this.flowsToken(this.wsClient);
            this.flowsResConnect(this.wsClient);
            if (connect.isSucc) {
                log.info('服务器连接成功');
                resolve(true);
            }
            else {
                log.error('服务器ws连接失败', connect.errMsg);
                reject(connect.errMsg);
            }
        });
    }
    async api(apiName, posData, msg) {
        let client = this.wsClient || this.httpClient;
        if (msg) {
            posData = Object.assign(posData, {
                _onlyid: msg.get_userId(),
                _messageid: msg.get_msgId(),
                _platform: msg.platform
            });
        }
        let req = await client.callApi(apiName, posData);
        if (req.isSucc) {
            return req.res;
        }
        else {
            log.info('请求出错', apiName, req.err.message);
        }
    }
}
export default new server();