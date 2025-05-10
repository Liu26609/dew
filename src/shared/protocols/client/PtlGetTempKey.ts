import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqGetTempKey extends BaseRequest {
    
}

export interface ResGetTempKey extends BaseResponse {
    TmpSecretId: string,
    TmpSecretKey: string,
    SecurityToken: string,
    StartTime: number,
    ExpiredTime: number,
}

export const conf: BaseConf = {
    
}