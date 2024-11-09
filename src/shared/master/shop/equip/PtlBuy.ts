import { BaseConf, BaseRequest, BaseResponse } from "../../../protocols/master_base";

export interface ReqBuy extends BaseRequest {
    
}

export interface ResBuy extends BaseResponse {

}
export const conf: BaseConf = {
    check_onlyid: true
}