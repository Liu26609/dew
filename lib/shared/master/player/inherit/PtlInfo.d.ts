import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
export interface ReqInfo extends BaseRequest {
}
/**
 * 查看我的血统属性
 * 名称
 * 来源
 * 附带技能
 * 提供的成长属性
 */
export interface ResInfo extends BaseResponse {
    name: string;
    from: string;
    sys: string;
    skills: string[];
    att: any[];
}
export declare const conf: BaseConf;