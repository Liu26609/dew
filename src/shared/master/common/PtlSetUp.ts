import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";
import { _user_cfg } from "../shareFace";
/**
 * 用户个人设置
 */
export interface ReqSetUp extends BaseRequest {
    key:string
    value:boolean
}

export interface ResSetUp extends _user_cfg {
   
}

export const conf: BaseConf = {
    check_onlyid: true
}