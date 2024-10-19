import { rank_item } from "../master/interface";
import { BaseRequest, BaseResponse, BaseConf } from "../protocols/server_rank_base";
export interface ReqUpdate extends BaseRequest {
    data: rank_item;
}
export interface ResUpdate extends BaseResponse {
}
export declare const conf: BaseConf;
