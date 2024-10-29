import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqUpLeve extends BaseRequest {
    idx:number
}

export interface ResUpLeve extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}