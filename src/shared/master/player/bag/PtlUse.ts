import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
/**
 * 使用背包内的道具
 */
export interface ReqUse extends BaseRequest {
    /**
     * 背包ID
     */
    idx:number
    /**
     * 使用数量
     */
    cont:number
}

export interface ResUse extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}