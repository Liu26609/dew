import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqSetName extends BaseRequest {
    new:string
}

export interface ResSetName extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}