import { mail_item } from "../shareFace";
import { BaseRequest, BaseResponse, BaseConf } from "../protocols/server_mail_base";
export interface ReqSend extends BaseRequest {
    data: mail_item;
}
export interface ResSend extends BaseResponse {
}
export declare const conf: BaseConf;
