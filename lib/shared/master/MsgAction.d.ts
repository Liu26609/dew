import { BaseMessage, BaseConf } from "./../protocols/base";
export declare enum template {
    未注册 = "\u672A\u6CE8\u518C",
    测试 = "\u6D4B\u8BD5",
    战斗日志 = "\u6218\u6597\u65E5\u5FD7",
    文本消息 = "\u6587\u672C\u6D88\u606F"
}
export interface MsgAction extends BaseMessage {
    template: template;
    messageId: string;
    data?: any;
    delaytime?: number;
}
export interface MSG_BATTLELOG {
    /**
     * 战斗标题
     */
    title: string;
    /**
   * 战斗标题描述
   */
    tips: string;
    round: number;
    skLog: any[];
    dataLog: any[];
    killLog: any[];
    gitfs: any[];
}
export declare const conf: BaseConf;
