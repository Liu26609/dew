import { HttpClient } from "tsrpc";
import { serverBase } from "../model/server/serverBase";
import god from "../god";
import { ServiceType, serviceProto } from "../shared/server_rank/serviceProto";
import logic from "./logic";
class index extends serverBase {
    c_http!: HttpClient<ServiceType>;
    constructor() {
        super()
    }
    async startServer(start_server?): Promise<void> {
        const cfg_port = god.getServerCfgItem('rank_port');
        const port = Number(cfg_port.a);
        if(start_server){
            await this._startServer_http(serviceProto, { port: port });
            logic.init()
        }
        const cfg = god.getServerCfgItem('rank_server')
        this.c_http = new HttpClient(serviceProto, { server: `${cfg.a}:${port}` })
    }
}
export default new index()._init(__dirname);