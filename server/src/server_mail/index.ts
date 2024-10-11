import { HttpClient } from "tsrpc";
import { serverBase } from "../model/server/serverBase";
import { ServiceType, serviceProto } from "../shared/server_mail/serviceProto";
// import god from "../god";
import manage_mail from "./model/manage_mail";

class index extends serverBase {
    c_http!: HttpClient<ServiceType>;
    constructor() {
        super()
    }
    async startServer(start_server?): Promise<void> {
        // const cfg_port = god.getServerCfgItem('mail_port');
        // const port = Number(cfg_port.a);
        // if(start_server){
        //     await manage_mail.init();
        //     await this._startServer_http(serviceProto, { port: port });
        // }
        // const cfg = god.getServerCfgItem('mail_server')
        // this.c_http = new HttpClient(serviceProto, { server: `${cfg.a}:${port}` })
    }
}
export default new index()._init(__dirname);