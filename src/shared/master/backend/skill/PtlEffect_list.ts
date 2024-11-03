import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqEffect_list extends BaseRequest {
    
}

export interface ResEffect_list extends BaseResponse {
    list:any[]
}

export const conf: BaseConf = {
    check_onlyid: false
}