import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";
import { MSG_BATTLELOG } from "../MsgAction";

export interface ReqBattle extends BaseRequest {
}

export interface ResBattle extends BaseResponse {
}

export const conf: BaseConf = {
    check_onlyid: true,
    battle: true
}