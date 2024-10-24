import { ServiceProto } from 'tsrpc-proto';
import { ReqCompressImg, ResCompressImg } from './PtlCompressImg';
import { ReqPing, ResPing } from './PtlPing';
export interface ServiceType {
    api: {
        "CompressImg": {
            req: ReqCompressImg;
            res: ResCompressImg;
        };
        "Ping": {
            req: ReqPing;
            res: ResPing;
        };
    };
    msg: {};
}
export declare const serviceProto: ServiceProto<ServiceType>;
