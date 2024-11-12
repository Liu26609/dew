import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";
// 新增绑定
export interface ReqAdd extends BaseRequest {
    
}

export interface ResAdd extends BaseResponse {
    code:string
}

export const conf: BaseConf = {
    check_onlyid: true
}