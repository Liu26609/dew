import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
import { Item_Type } from "../../../PtlFace";

export interface ReqLook extends BaseRequest {
    idx:number
}

export interface ResLook extends BaseResponse {
    type:Item_Type
    temp:any
}

export const conf: BaseConf = {
    check_onlyid: true
}