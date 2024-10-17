import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";

export interface ReqSave extends BaseRequest {
    
}

export interface ResSave extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}