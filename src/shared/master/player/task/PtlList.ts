import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqList extends BaseRequest {
}

export interface ResList extends BaseResponse {
    list:string[]
    
}

export const conf: BaseConf = {
    check_onlyid: true
}