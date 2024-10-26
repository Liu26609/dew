import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";
/**
 * 取消交易
 */
export interface ReqCancel extends BaseRequest {
    
}

export interface ResCancel extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}