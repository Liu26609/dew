import { BaseMessage, BaseConf } from "./../protocols/base";
import { prop_item } from "./shareFace";
export enum template {
    未注册 = '未注册',
    测试 = '测试',
    战斗日志 = '战斗日志',
    文本消息 = '文本消息',
    交易创建 = '交易/创建',
    纯文字 = '纯文字',
    离线奖励 = '离线奖励',
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
export interface MSG_OFFLINE_REWARD {
    /**
     * 离线时间
     */
    time: number;
    /**
     * 奖励
     */
    reward: prop_item[];
}
export interface transaction_create {
    /**交易原因 */
    res:string
    items: { name: string, now: number,need:number,icon:string }[]
}

export const conf: BaseConf = {

}

