import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqRename extends BaseRequest {
    idx: number,
    rename: string
}

export interface ResRename extends BaseResponse {
    
}
/**
 * 修改自身技能名称
 */
export const conf: BaseConf = {
    check_onlyid: true
}