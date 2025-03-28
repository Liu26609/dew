import { UserInfo, ClientInfo, Message } from "../face/IMassage";
import { BaseRequest, BaseResponse, BaseConf } from "./base";

export interface ReqMessage extends BaseRequest {
    UserInfo:UserInfo,
    ClientInfo:ClientInfo,
    Message:Message
}

export interface ResMessage extends BaseResponse {
    
}

export const conf: BaseConf = {
    
}