import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";

export interface ReqBuild extends BaseRequest {
    
}

export interface ResBuild extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: false
}