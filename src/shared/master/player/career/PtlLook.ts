import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqLook extends BaseRequest {
    
}

export interface ResLook extends BaseResponse {
    // name:string
    // from:string
    // // 系统
    // sys:string
    // skills:string[]
    // att:any[]
}

export const conf: BaseConf = {
    check_onlyid: true
}