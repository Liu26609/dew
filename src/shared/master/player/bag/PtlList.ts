import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqList extends BaseRequest {
    
}
/**
 * 背包列表
 */
export interface ResList extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}