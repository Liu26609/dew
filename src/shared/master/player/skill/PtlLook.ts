import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

/**
 * 查看自身指定技能
 */
export interface ReqLook extends BaseRequest {
    idx: number;
}
/**
 * 技能名称
 * 技能cd
 * 技能类型
 * 技能描述
 */
export interface ResLook extends BaseResponse {
    /**技能名称 */
    name: string;
    /**
     * 技能cd
     */
    cd:number;
    /**
     * 0 主动技能,
     * 1 被动技能
     */
    type: number;
    /**技能描述 */
    desc: string;
}

export const conf: BaseConf = {
    check_onlyid: true
}