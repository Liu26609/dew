import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";
/**
 * 获取指定体系配置
 */
export interface ReqGetBodySysCfg extends BaseRequest {
    key: string;
}
export interface ResGetBodySysCfg extends BaseResponse {
    cfg: any;
}
export declare const conf: BaseConf;
