"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsrpc_1 = require("tsrpc");
const serviceProto_1 = require("./shared/master/serviceProto");
const _1 = require(".");
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
            this.httpClient = new tsrpc_1.HttpClient(serviceProto_1.serviceProto, { server: this.apiUrl });
            this.flowsToken(this.httpClient);
            resolve(true);
        });
    }
    flowsToken(client) {
        client.flows.preApiReturnFlow.push((v) => {
            if (v.return.isSucc) {
                if (v.return.res.__token) {
                    // tokenMap.set('_token', v.return.res.__token)
                }
            }
            return v;
        });
    }
    flowsResConnect(client) {
        client.flows.postDisconnectFlow.push((v) => {
            if (!v.isManual) {
                this.connect();
                _1.log.info('开始断线重连');
            }
            // Bot_client.emit(Emitter_bot.server_off);
            return v;
        });
    }
    async connect() {
        let res = await this.wsClient.connect();
        if (!res.isSucc) {
            _1.log.info('重试断线重连失败2秒后开始重试');
            setTimeout(async () => {
                this.connect();
            }, 2000);
        }
        else {
            _1.log.info('断线重连成功');
        }
        return res;
    }
    lisentMsg(msgName, handler, self) {
        return this.wsClient.listenMsg(msgName, ((data) => { handler.call(self, data); }));
    }
    async setWsUrl(link) {
        _1.log.info(`server link:${link}`);
        this.init = true;
        return new Promise(async (resolve, reject) => {
            this.apiUrl = link;
            this.wsClient = new tsrpc_1.WsClient(serviceProto_1.serviceProto, { server: this.apiUrl });
            const connect = await this.wsClient.connect();
            // this.flowsToken(this.wsClient);
            this.flowsResConnect(this.wsClient);
            if (connect.isSucc) {
                _1.log.info('服务器连接成功');
                resolve(true);
            }
            else {
                _1.log.error('服务器ws连接失败', connect.errMsg);
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
            _1.log.info('请求出错', apiName, req.err.message);
        }
    }
}
exports.default = new server();
