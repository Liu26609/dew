import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
import { prop_item_equip } from "../../../PtlFace";

export interface ReqLook extends BaseRequest {
    idx:number
}

export interface ResLook extends prop_item_equip {

}

export const conf: BaseConf = {
    check_onlyid: true
}