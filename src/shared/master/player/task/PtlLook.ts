import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
import { taskData } from "../../shareFace";

export interface ReqLook extends BaseRequest {
    name:string
}

export interface ResLook extends taskData {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}