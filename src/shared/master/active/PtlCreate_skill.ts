import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";
import { SKILL_target, SKILL_rang } from "../face/FACE_SKILL";
import { prop_item_skill, SKILL_type } from "../shareFace";
/**
 * 装备祈愿
 */
export interface ReqCreate_skill extends BaseRequest {
     cont:number
}

export interface ResCreate_skill extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}