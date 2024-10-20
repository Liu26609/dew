import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqReset extends BaseRequest {
    
}
/**
 * 重置血统
 * 暂时不返回参数
 */
export interface ResReset extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}