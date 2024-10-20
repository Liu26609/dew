"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsrpc_1 = require("tsrpc");
const serviceProto_1 = require("./shared/master/serviceProto");
const _1 = require(".");
class server {
    constructor() {
        this.init = false;
    }
    // 卸载
    dispose() {
        return __awaiter(this, void 0, void 0, function* () {
            this.init = false;
            if (this.wsClient) {
                this.wsClient.unlistenMsgAll();
                this.wsClient.disconnect();
            }
        });
    }
    /**
 * 设置服务器地址
 * @param link
 */
    setApiUrl(link) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.apiUrl = `http://${link}`;
                this.httpClient = new tsrpc_1.HttpClient(serviceProto_1.serviceProto, { server: this.apiUrl });
                this.flowsToken(this.httpClient);
                resolve(true);
            });
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
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.wsClient.connect();
            if (!res.isSucc) {
                _1.log.info('重试断线重连失败2秒后开始重试');
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    this.connect();
                }), 2000);
            }
            else {
                _1.log.info('断线重连成功');
            }
            return res;
        });
    }
    lisentMsg(msgName, handler, self) {
        return this.wsClient.listenMsg(msgName, ((data) => { handler.call(self, data); }));
    }
    setWsUrl(link) {
        return __awaiter(this, void 0, void 0, function* () {
            _1.log.info(`server link:${link}`);
            this.init = true;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this.apiUrl = link;
                this.wsClient = new tsrpc_1.WsClient(serviceProto_1.serviceProto, { server: this.apiUrl });
                this.wsClient.unlistenMsgAll();
                const connect = yield this.wsClient.connect();
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
            }));
        });
    }
    api(apiName, posData, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = this.wsClient || this.httpClient;
            if (msg) {
                posData = Object.assign(posData, {
                    _onlyid: msg.get_userId(),
                    _messageid: msg.get_msgId(),
                    _platform: msg.platform
                });
            }
            let req = yield client.callApi(apiName, posData);
            if (req.isSucc) {
                return req.res;
            }
            else {
                _1.log.info('请求出错', apiName, req.err.message);
            }
        });
    }
}
exports.default = new server();
