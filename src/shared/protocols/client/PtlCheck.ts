import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqCheck extends BaseRequest {
    
}

export interface ResCheck extends BaseResponse {
    judge:boolean
}

export const conf: BaseConf = {
    
}