import { UserInfo, ClientInfo, Message, ClientAction } from "./IMassage";
import { BaseRequest, BaseResponse, BaseConf } from "./base";
import { MsgMessage } from "./MsgMessage";

export interface ReqMessage extends BaseRequest {
    UserInfo:UserInfo,
    ClientInfo:ClientInfo,
    Message:Message
}

export interface ResMessage extends MsgMessage,BaseResponse {
}

export const conf: BaseConf = {
    
}