import { HttpClient, WsClient, WsServer } from "tsrpc";
import { serverBase } from "../model/server/serverBase";
import { serviceProto, ServiceType } from "../shared/tool/serviceProto";

class index extends serverBase {
    c_http!: HttpClient<ServiceType>;
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
        const port = 8849;
        const ip = cfg.ip;
        // await this.init();
        // this.c_http = new HttpClient(serviceProto, { server: `http://${ip}:${port}` });
        await this._startServer_http(serviceProto, { port: port });
        // logic.pushFlow();
        // this.c_wss = await serverBase.create_wssClient(serviceProto, {
        //     server: `ws://${ip}:${port}`
        // }) as unknown as WsClient<ServiceType>;
        // this.test()
    }


}
export default new index()._init(__dirname);