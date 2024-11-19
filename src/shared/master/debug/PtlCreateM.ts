import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";

export interface ReqCreateM extends BaseRequest {
    
}

export interface ResCreateM extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}