import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
export interface ReqGetBase extends BaseRequest {
}
export interface ResGetBase extends BaseResponse {
    name: string;
}
export declare const conf: BaseConf;
