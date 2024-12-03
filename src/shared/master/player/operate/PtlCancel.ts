import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqCancel extends BaseRequest {
    
}

export interface ResCancel extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}