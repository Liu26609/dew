import { mail_item } from "../interface";
import { BaseRequest, BaseResponse, BaseConf } from "../protocols/server_mail_base";

export interface ReqSend extends BaseRequest {
    data:mail_item
}

export interface ResSend extends BaseResponse {
    
}

export const conf: BaseConf = {
    
}