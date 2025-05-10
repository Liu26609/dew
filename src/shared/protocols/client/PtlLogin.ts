import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqLogin extends BaseRequest {
    account:string,
}

export interface ResLogin extends BaseResponse {
    token:string
}

export const conf: BaseConf = {
    
}