import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";

export interface ReqFlow extends BaseRequest {
    
}

export interface ResFlow extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}