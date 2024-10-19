import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
export interface ReqSkill extends BaseRequest {
    name: string;
}
export interface ResSkill extends BaseResponse {
}
export declare const conf: BaseConf;
