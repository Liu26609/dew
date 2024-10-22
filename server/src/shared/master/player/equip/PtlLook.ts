import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqLook extends BaseRequest {
    idx:number
}

export interface ResLook extends BaseResponse {
    name:string
    sys:string
    att:any[]
}

export const conf: BaseConf = {
    check_onlyid: true
}