import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";

export interface ReqAtt extends BaseRequest {
    
}

export interface ResAtt extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}