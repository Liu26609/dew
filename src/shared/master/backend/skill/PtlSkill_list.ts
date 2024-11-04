import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqSkill_list extends BaseRequest {
    
}

export interface ResSkill_list extends BaseResponse {
    list:any[]
}

export const conf: BaseConf = {
    check_onlyid: false
}