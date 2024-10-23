import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
export interface ReqReName extends BaseRequest {
    idx: number;
    name: string;
}
export interface ResReName extends BaseResponse {
}
export declare const conf: BaseConf;
