import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
import { prop_item_skill } from "../../shareFace";

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
export interface ResLook extends prop_item_skill, BaseResponse {

}

export const conf: BaseConf = {
    check_onlyid: true
}