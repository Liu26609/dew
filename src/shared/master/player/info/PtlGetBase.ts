import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
import { MSG_ATT_INFO } from "../../MsgAction";

export interface ReqGetBase extends BaseRequest {
    
}

export interface ResGetBase extends MSG_ATT_INFO,BaseResponse {
    name:string,
    sys:string,
    /**
     * 战力
     */
    fight:number,
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