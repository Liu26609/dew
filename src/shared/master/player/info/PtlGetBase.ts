import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqGetBase extends BaseRequest {
    
}

export interface ResGetBase extends BaseResponse {
    name:string,
    sys:string,
    leve:number,
    /**
     * 血统名称
     */
    inherit:string,
    className:string,
    att:any[]
}

export const conf: BaseConf = {
    check_onlyid: true
}