import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqConfirm extends BaseRequest {
    id?:string
}

export interface ResConfirm extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}