import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
/**
 * 出售给系统商店
 */
export interface ReqSell_sys extends BaseRequest {
    idx: number;
    cont: number;
}
export interface ResSell_sys extends BaseResponse {
}
export declare const conf: BaseConf;
