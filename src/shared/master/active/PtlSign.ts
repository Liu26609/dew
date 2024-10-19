import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";
/**
 * 活动-签到
 */
export interface ReqSign extends BaseRequest {
    
}

export interface ResSign extends BaseResponse {
    /**
     * 共计签到
     */
    consecutive_sign_count:number
    /**
     * 累计签到
     */
    sign_count:number
    /**
     * 今日排名
     */
    todayRank:number
    /**
     * 获得奖励
     */
    gitfs:any[];
}

export const conf: BaseConf = {
    check_onlyid: true
}