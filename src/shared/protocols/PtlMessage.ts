import { UserInfo, ClientInfo, Message, ClientAction } from "../face/IMassage";
import { BaseRequest, BaseResponse, BaseConf } from "./base";


export interface ReqMessage extends BaseRequest {
    UserInfo:UserInfo,
    ClientInfo:ClientInfo,
    Message:Message
}

export interface ResMessage extends BaseResponse {
    action:ClientAction,
    message:Message,
    data?:any
}

export const conf: BaseConf = {
    
}