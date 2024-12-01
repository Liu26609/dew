import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqCommit extends BaseRequest {
    id?:string
}

export interface ResCommit extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}