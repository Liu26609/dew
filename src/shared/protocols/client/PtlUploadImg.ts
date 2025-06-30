import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqUploadImg extends BaseRequest {
    imgBuf: Uint8Array;
}

export interface ResUploadImg extends BaseResponse {
    imgUrl:string
}

export const conf: BaseConf = {
    
}