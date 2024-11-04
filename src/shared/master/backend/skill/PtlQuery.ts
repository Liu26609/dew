import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqQuery extends BaseRequest {
    id:string
}

export interface ResQuery extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: false
}