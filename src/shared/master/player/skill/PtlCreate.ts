import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
import { SKILL_rang, SKILL_target } from "../../face/FACE_SKILL";
import { prop_item_skill, SKILL_type } from "../../shareFace";
/**
 * 创建技能
 */
export interface ReqCreate extends BaseRequest {
    // 技能类型
    type:SKILL_type
    // 技能目标
    target:SKILL_target
    // 技能范围
    rang_type:SKILL_rang
}

export interface ResCreate extends prop_item_skill,BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}