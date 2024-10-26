import { BaseMessage, BaseConf } from "./../protocols/base";
export enum template {
    未注册 = '未注册',
    测试 = '测试',
    战斗日志 = '战斗日志',
    文本消息 = '文本消息',
    交易创建 = '交易/创建',
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
export interface transaction_create {
    /**交易原因 */
    res:string
    items: { name: string, now: number,need:number }[]
}
export const conf: BaseConf = {

}

