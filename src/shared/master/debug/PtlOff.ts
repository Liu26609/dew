import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";

export interface ReqOff extends BaseRequest {
    
}

export interface ResOff extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}