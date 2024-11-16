import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
import { followData } from "../../face_master";
export interface ReqList extends BaseRequest {
    
}

export interface ResList extends BaseResponse {
    upBattle?: followData;
    list: followData[];
}

export const conf: BaseConf = {
    check_onlyid: true
}