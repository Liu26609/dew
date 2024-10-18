import { BaseMessage, BaseConf } from "./../protocols/base";
export enum template{
    未注册 = '未注册',
    测试 = '测试',
    战斗日志 = '战斗日志',
    文本消息= '文本消息'
}
export interface MsgAction extends BaseMessage {
    template: template;
    messageId:string;
    data?:any
}

export const conf: BaseConf = {
    
}