import { BaseRequest, BaseResponse, BaseConf } from "../protocols/tool_base";

export interface ReqCompressImg {
    imgBuf: Uint8Array;
}

export interface ResCompressImg {
    imgBuf: Uint8Array;
}

export const conf: BaseConf = {
    
}