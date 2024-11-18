import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";
/**
 * 装备祈愿
 */
export interface ReqCreate_skill extends BaseRequest {
     cont:number
}

export interface ResCreate_skill extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}