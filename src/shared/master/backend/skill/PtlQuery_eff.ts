import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqQuery_eff extends BaseRequest {
    id:number
}

export interface ResQuery_eff extends BaseResponse {
    data:any
}

export const conf: BaseConf = {
    check_onlyid: false
}