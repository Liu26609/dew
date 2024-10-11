import { HttpClient, WsClient } from "tsrpc";
import { serverBase } from "../model/server/serverBase";
import { ServiceType, serviceProto } from "../shared/master/serviceProto";
import logic from "./logic";

class index extends serverBase {
    c_http!: HttpClient<ServiceType>;
    c_wss!: WsClient<ServiceType>;
    constructor() {
        super();
    }
    private startBf() {

    }
    async startServer(): Promise<void> {
        this.startBf();
        let cfg = {
            "ip": "127.0.0.1",
            "logger": true,
            "json": true
        }
        const port = 8848;
        const ip = cfg.ip;
        // await this.init();
        // this.c_http = new HttpClient(serviceProto, { server: `http://${ip}:${port}` });
        await this._startServer_wss(serviceProto, { port: port });
        logic.pushFlow();
        // this.c_wss = await serverBase.create_wssClient(serviceProto, {
        //     server: `ws://${ip}:${port}`
        // }) as unknown as WsClient<ServiceType>;
        // this.test()
    }


}
export default new index()._init(__dirname);