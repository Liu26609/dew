import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqDel extends BaseRequest {
    id:any
}

export interface ResDel extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: false
}