import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
import { prop_item_equip } from "../../shareFace";

export interface ReqLook extends BaseRequest {
    
}

export interface ResLook extends BaseResponse {
    data:prop_item_equip,
    stock: number,
    price: {
        name: string;
        cont: number;
    };
    down_time: number
}

export const conf: BaseConf = {
    check_onlyid: true
}