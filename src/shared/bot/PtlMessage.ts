import { BaseConf, BaseRequest, BaseResponse } from "./protocols/base";

/**
 * 消息请求
 */
export interface ReqMessage extends BaseRequest {
    /**
     * 机器人
     */
    bot: {
        id: string,
        // 平台
        platform: string,
    }
    /**
     * 用户
     */
    user:{
        id:string,
    }
    /**
     * 消息内容
     */
    content: string;
}

/**
 * 消息响应
 */
export interface ResMessage extends BaseResponse {

}

export const conf: BaseConf = {
    openApi: false,
}