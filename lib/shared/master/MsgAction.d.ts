import { BaseMessage, BaseConf } from "./../protocols/base";
export declare enum template {
    未注册 = "\u672A\u6CE8\u518C",
    测试 = "\u6D4B\u8BD5",
    回合战斗 = "\u56DE\u5408\u6218\u6597",
    文本消息 = "\u6587\u672C\u6D88\u606F"
}
export interface MsgAction extends BaseMessage {
    template: template;
    messageId: string;
    data?: any;
}
export declare const conf: BaseConf;
