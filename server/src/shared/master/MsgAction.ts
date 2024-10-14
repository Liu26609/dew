import { BaseMessage, BaseConf } from "./../protocols/base";
export enum template{
    未注册,
    测试
}
export interface MsgAction extends BaseMessage {
    template: template;
    messageId:string;
    data?:any
}

export const conf: BaseConf = {
    
}