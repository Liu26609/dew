import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";

export interface ReqTakeOffEquip extends BaseRequest {
    
}

export interface ResTakeOffEquip extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}