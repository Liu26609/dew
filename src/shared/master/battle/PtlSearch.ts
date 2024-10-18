import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";
/**
 * 探索地图
 */
export interface ReqSearch extends BaseRequest {
    
}

export interface ResSearch extends BaseResponse {
    type: 'monster' | 'player' | 'reward',
    data: any
}

export const conf: BaseConf = {
    check_onlyid: true
}