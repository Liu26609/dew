import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";
/**
 * 装备实装测试
 */
export interface ReqUpequip extends BaseRequest {
    
}

export interface ResUpequip extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}