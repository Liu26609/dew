import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqList extends BaseRequest {
    
}
/**
 * 背包列表
 * 名称
 * 数量
 */
export interface ResList extends BaseResponse {
    list:{name:string,cont:number,idx:number}[]
}

export const conf: BaseConf = {
    check_onlyid: true
}