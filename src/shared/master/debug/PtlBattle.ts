import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";

export interface ReqBattle extends BaseRequest {
}

export interface ResBattle extends BaseResponse {
    log: any[]
    
}

export const conf: BaseConf = {
    check_onlyid: true
}