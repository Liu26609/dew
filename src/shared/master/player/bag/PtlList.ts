import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
import { Item_Type } from "../../shareFace";

export interface ReqList extends BaseRequest {
    // 过滤类型
    filter?:Item_Type;
}
/**
 * 背包列表
 * 名称
 * 数量
 */
export interface ResList extends BaseResponse {
    filter?:Item_Type;
    gold:number,
    list:{name:string,cont:number,idx:number}[]
}

export const conf: BaseConf = {
    check_onlyid: true
}