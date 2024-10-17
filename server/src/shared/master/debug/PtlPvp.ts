import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";

export interface ReqPvp extends BaseRequest {
    
}

export interface ResPvp extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}