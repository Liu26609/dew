import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
/**
 * 查看我的穿戴装备列表
 */
export interface ReqList extends BaseRequest {
    
}

export interface ResList extends BaseResponse {
    list:({name:string,type:string}|undefined)[]
}

export const conf: BaseConf = {
    check_onlyid: true
}