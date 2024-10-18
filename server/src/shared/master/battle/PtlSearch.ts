import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";
/**
 * 探索地图
 */
export interface ReqSearch extends BaseRequest {
    
}

export interface ResSearch extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}