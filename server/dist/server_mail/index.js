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
const serverBase_1 = require("../model/server/serverBase");
class index extends serverBase_1.serverBase {
    constructor() {
        super();
    }
    startServer(start_server) {
        return __awaiter(this, void 0, void 0, function* () {
            // const cfg_port = god.getServerCfgItem('mail_port');
            // const port = Number(cfg_port.a);
            // if(start_server){
            //     await manage_mail.init();
            //     await this._startServer_http(serviceProto, { port: port });
            // }
            // const cfg = god.getServerCfgItem('mail_server')
            // this.c_http = new HttpClient(serviceProto, { server: `${cfg.a}:${port}` })
        });
    }
}
exports.default = new index()._init(__dirname);
