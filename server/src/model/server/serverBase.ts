import { HttpClient, HttpClientOptions, HttpServer, HttpServerOptions, Logger, WsClient, WsClientOptions, WsServer } from "tsrpc";
import path from "path";
import { logger } from "./logger";
export interface server_cfg {
    port: number,
    json: boolean,
    logger?: Logger
}
export class serverBase {
    s_http!: HttpServer<any>;
    s_wss!: WsServer<any>;
    c_http!: HttpClient<any>;
    c_wss!: WsClient<any>;
    private _dir!: string;
    constructor() {

    }
    _init(dir: string) {
        this._dir = dir;

        logger.log(`环境地址:`, dir)
        return this;
    }
    async startServer(cfg: server_cfg) {

    }
    /**
     * 根据配置 决定启动本地服务器和客户端
     */
    async _startServer_http(proto: any, cfg: { port: number }) {
        this.s_http = serverBase.create_httpServer(proto, {
            json: true,
            logger: logger,
            ...cfg,

        });
        await this.s_http.autoImplementApi(path.resolve(this._dir, `./api`))
        await this.s_http.start();
    }
    async _startServer_wss(proto: any, cfg: { port: number }) {
        this.s_wss = serverBase.create_wssServer(proto, {
            json: true,
            logger: logger,
            ...cfg,
        })
        await this.s_wss.autoImplementApi(path.resolve(this._dir, `./api`))
        await this.s_wss.start();
    }


    /**
     * 创建一个服务器实例
     * @param proto 
     * @param cfg 
     * @returns 
     */
    public static create_httpServer(proto: any, cfg: server_cfg) {
        return new HttpServer(proto, cfg)
    }
    private static create_wssServer(proto: any, cfg: server_cfg) {
        return new WsServer(proto, cfg)
    }
    public static create_httpClient(proto: any, cfg: HttpClientOptions) {
        return new HttpClient(proto, cfg)
    }
    public static async create_wssClient(proto: any, cfg: Partial<WsClientOptions>) {
        let client = new WsClient(proto, cfg)
        let req = await client.connect();
        if (!req.isSucc) {
            debugger;
        }
        return client
    }
    push_preApiCallFlow(call: any,server?: WsServer,server_h?:HttpServer, ) {
        server && server.flows.preApiCallFlow.push(call)
        server_h && server_h.flows.preApiCallFlow.push(call)
    }
}