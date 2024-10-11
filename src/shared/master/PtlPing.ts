import { BaseRequest, BaseResponse, BaseConf } from "../protocols/master_base";

export interface ReqPing extends BaseRequest {
    
}

export interface ResPing extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: false
}