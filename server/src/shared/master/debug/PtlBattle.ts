import { MSG_BATTLELOG } from "../../interface";
import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";

export interface ReqBattle extends BaseRequest {
}

export interface ResBattle extends BaseResponse {
    data:MSG_BATTLELOG
}

export const conf: BaseConf = {
    check_onlyid: true
}