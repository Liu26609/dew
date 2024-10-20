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
const serverBase_1 = require("../model/server/serverBase");
const serviceProto_1 = require("../shared/master/serviceProto");
const logic_1 = __importDefault(require("./logic"));
class index extends serverBase_1.serverBase {
    constructor() {
        super();
    }
    startBf() {
    }
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            this.startBf();
            let cfg = {
                "ip": "127.0.0.1",
                "logger": true,
                "json": true
            };
            const port = 8848;
            const ip = cfg.ip;
            // await this.init();
            // this.c_http = new HttpClient(serviceProto, { server: `http://${ip}:${port}` });
            yield this._startServer_wss(serviceProto_1.serviceProto, { port: port });
            logic_1.default.pushFlow();
            // this.c_wss = await serverBase.create_wssClient(serviceProto, {
            //     server: `ws://${ip}:${port}`
            // }) as unknown as WsClient<ServiceType>;
            // this.test()
        });
    }
}
exports.default = new index()._init(__dirname);
