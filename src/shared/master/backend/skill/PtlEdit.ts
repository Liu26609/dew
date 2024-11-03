import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqEdit extends BaseRequest {
    data:any
}

export interface ResEdit extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: false
}