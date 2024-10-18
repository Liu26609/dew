import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";
/**
 * 活动-签到
 */
export interface ReqSign extends BaseRequest {
    
}

export interface ResSign extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}