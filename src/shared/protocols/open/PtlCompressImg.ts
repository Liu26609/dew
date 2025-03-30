import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqCompressImg extends BaseRequest {
    imgBuf: Uint8Array;
}

export interface ResCompressImg extends BaseResponse {
    imgBuf: Uint8Array;
}

export const conf: BaseConf = {
    
}