import { mail_item } from "../interface";
import { BaseRequest, BaseResponse, BaseConf } from "../protocols/server_mail_base";

export interface ReqPull extends BaseRequest {
    uuid:string
    dev:number
}

export interface ResPull extends BaseResponse {
    list:mail_item[]
    dev:number
}

export const conf: BaseConf = {
    
}