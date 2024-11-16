import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqFollow extends BaseRequest {
    cont:number
}

export interface ResFollow extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}