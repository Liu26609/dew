import { ServiceProto } from 'tsrpc-proto';
import { ReqCheck, ResCheck } from './PtlCheck';
import { ReqPull, ResPull } from './PtlPull';
import { ReqSend, ResSend } from './PtlSend';
export interface ServiceType {
    api: {
        "Check": {
            req: ReqCheck;
            res: ResCheck;
        };
        "Pull": {
            req: ReqPull;
            res: ResPull;
        };
        "Send": {
            req: ReqSend;
            res: ResSend;
        };
    };
    msg: {};
}
export declare const serviceProto: ServiceProto<ServiceType>;
