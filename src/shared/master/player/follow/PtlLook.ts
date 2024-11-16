import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
/**
 * 查看当前玩家跟随的随从
 */
export interface ReqLook extends BaseRequest {
    
}

export interface ResLook extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}