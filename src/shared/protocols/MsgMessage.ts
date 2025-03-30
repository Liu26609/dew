import { ClientAction, ClientInfo, Message } from "../face/IMassage";
import { BaseMessage, BaseConf } from "./base";

export interface MsgMessage extends BaseMessage {
    action:ClientAction,
    Message:Message,
    ClientInfo:ClientInfo[],
    info?:any,
    data?:any
}

export const conf: BaseConf = {
    
}