import { rank_item, rank_type } from "../interface";
import { BaseRequest, BaseResponse, BaseConf } from "../protocols/server_rank_base";
export interface ReqLook extends BaseRequest {
    type: rank_type;
    uuid: string;
}
export interface ResLook extends BaseResponse {
    list: rank_item[];
    query_rank: number;
}
export declare const conf: BaseConf;
