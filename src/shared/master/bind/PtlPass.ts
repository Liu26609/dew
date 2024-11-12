import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";

export interface ReqPass extends BaseRequest {
    code:string
}

export interface ResPass extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}