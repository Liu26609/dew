import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
/**
 * 卸下装备 放入背包
 */
export interface ReqTakeOff extends BaseRequest {
    idx:number
}

export interface ResTakeOff extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}