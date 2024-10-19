import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
/**
 * 进入历练副本
 */
export interface ReqStart extends BaseRequest {
    name: string | undefined;
}
export interface ResStart extends BaseResponse {
}
export declare const conf: BaseConf;
