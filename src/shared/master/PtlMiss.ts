import { BaseRequest, BaseResponse, BaseConf } from "../protocols/master_base";

export interface ReqMiss extends BaseRequest {
    
}

export interface ResMiss extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}