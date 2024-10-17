import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";
/**
 * 离开当前的pvp战斗
 */
export interface ReqOut extends BaseRequest {
    
}

export interface ResOut extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}