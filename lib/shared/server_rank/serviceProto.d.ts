import { ServiceProto } from 'tsrpc-proto';
import { ReqLook, ResLook } from './PtlLook';
import { ReqUpdate, ResUpdate } from './PtlUpdate';
export interface ServiceType {
    api: {
        "Look": {
            req: ReqLook;
            res: ResLook;
        };
        "Update": {
            req: ReqUpdate;
            res: ResUpdate;
        };
    };
    msg: {};
}
export declare const serviceProto: ServiceProto<ServiceType>;
