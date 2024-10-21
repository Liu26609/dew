import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
/**
 * 移除自身技能
 * TODO:如果技能全部遗忘，那么自动添加一个默认技能
 */
export interface ReqRm extends BaseRequest {
    idx: number
}

export interface ResRm extends BaseResponse {
    
}
/**
 * 删除自身指定技能
 */
export const conf: BaseConf = {
    check_onlyid: true
}