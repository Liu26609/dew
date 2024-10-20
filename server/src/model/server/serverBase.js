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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverBase = void 0;
const tsrpc_1 = require("tsrpc");
const path_1 = __importDefault(require("path"));
const logger_1 = require("./logger");
class serverBase {
    constructor() {
    }
    _init(dir) {
        this._dir = dir;
        logger_1.logger.log(`环境地址:`, dir);
        return this;
    }
    startServer(cfg) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    /**
     * 根据配置 决定启动本地服务器和客户端
     */
    _startServer_http(proto, cfg) {
        return __awaiter(this, void 0, void 0, function* () {
            this.s_http = serverBase.create_httpServer(proto, Object.assign(Object.assign({}, cfg), { json: true, logger: logger_1.logger }));
            yield this.s_http.autoImplementApi(path_1.default.resolve(this._dir, `./api`));
            yield this.s_http.start();
        });
    }
    _startServer_wss(proto, cfg) {
        return __awaiter(this, void 0, void 0, function* () {
            this.s_wss = serverBase.create_wssServer(proto, Object.assign(Object.assign({}, cfg), { json: true, logger: logger_1.logger }));
            yield this.s_wss.autoImplementApi(path_1.default.resolve(this._dir, `./api`));
            yield this.s_wss.start();
        });
    }
    /**
     * 创建一个服务器实例
     * @param proto
     * @param cfg
     * @returns
     */
    static create_httpServer(proto, cfg) {
        return new tsrpc_1.HttpServer(proto, cfg);
    }
    static create_wssServer(proto, cfg) {
        return new tsrpc_1.WsServer(proto, cfg);
    }
    static create_httpClient(proto, cfg) {
        return new tsrpc_1.HttpClient(proto, cfg);
    }
    static create_wssClient(proto, cfg) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = new tsrpc_1.WsClient(proto, cfg);
            let req = yield client.connect();
            if (!req.isSucc) {
                debugger;
            }
            return client;
        });
    }
    push_preApiCallFlow(call, server, server_h) {
        server && server.flows.preApiCallFlow.push(call);
        server_h && server_h.flows.preApiCallFlow.push(call);
    }
}
exports.serverBase = serverBase;
