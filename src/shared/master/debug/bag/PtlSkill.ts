import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqSkill extends BaseRequest {
    name:string
}

export interface ResSkill extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}