import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqUp extends BaseRequest {
    idx:number;
}

export interface ResUp extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}