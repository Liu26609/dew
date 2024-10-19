import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqGetBase extends BaseRequest {
    
}

export interface ResGetBase extends BaseResponse {
    name:string,
    sys:string,
    className:string,
    att:any[]
}

export const conf: BaseConf = {
    check_onlyid: true
}