import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
import { prop_item_skill } from "../../shareFace";

export interface ReqBuy extends BaseRequest {
    
}

export interface ResBuy extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}