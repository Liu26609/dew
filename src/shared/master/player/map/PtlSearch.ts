import { BaseConf, BaseRequest, BaseResponse } from "../../../protocols/master_base"
import { ResPosition } from "../info/PtlPosition"

/**
 * 探索地图
 */
export interface ReqSearch extends BaseRequest {
    
}

export interface ResSearch extends ResPosition, BaseResponse {
}

export const conf: BaseConf = {
    check_onlyid: true
}