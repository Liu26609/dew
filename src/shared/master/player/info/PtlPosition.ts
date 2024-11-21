import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
/**
 * 查看当前位置
 */
export interface ReqPosition extends BaseRequest {
}

export interface ResPosition extends BaseResponse {}

export const conf: BaseConf = {
    check_onlyid: true
}