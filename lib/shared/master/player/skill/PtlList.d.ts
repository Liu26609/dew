import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
export interface ReqList extends BaseRequest {
}
export interface ResList extends BaseResponse {
    list: {
        name: string;
    }[];
}
export declare const conf: BaseConf;
