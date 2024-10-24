import { BaseRequest, BaseResponse, BaseConf } from "../protocols/tool_base";
export interface ReqCompressImg extends BaseRequest {
    imgBuf: Uint8Array;
    /**
     * 压缩质量，0-100，默认80
     */
    quality?: number;
}
export interface ResCompressImg extends BaseResponse {
    imgBuf: Uint8Array;
}
export declare const conf: BaseConf;
