import { BaseConf, BaseRequest, BaseResponse } from "../../../protocols/master_base";
/**
 * 探索地图
 */
export interface ReqSearch extends BaseRequest {
}
export interface ResSearch extends BaseResponse {
    type: 'monster' | 'player' | 'reward';
    data: any;
}
export declare const conf: BaseConf;
