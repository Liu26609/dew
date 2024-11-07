import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";
import { SKILL_target, SKILL_rang } from "../face/FACE_SKILL";
import { prop_item_skill, SKILL_type } from "../shareFace";
/**
 * 装备祈愿
 */
export interface ReqCreate_skill extends BaseRequest {
     // 技能类型
     type:SKILL_type
     // 技能目标
     target:SKILL_target
     // 技能范围
     rang_type:SKILL_rang
     leve:number
}

export interface ResCreate_skill extends prop_item_skill,BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}