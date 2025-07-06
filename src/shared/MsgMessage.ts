import { ClientAction, ClientInfo, Message } from "./IMassage";
import { BaseMessage, BaseConf } from "./base";

export interface MsgMessage extends BaseMessage {
    action:ClientAction,
    Message:Message,
    info?:any,
    data?:any,
    _player?:any
}

export const conf: BaseConf = {
    
}