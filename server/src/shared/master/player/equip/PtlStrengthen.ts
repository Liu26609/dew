import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";

export interface ReqStrengthen extends BaseRequest {
    idx:number,
    /**
     * 背包 - 装备栏
     */
    from:string
}

export interface ResStrengthen extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}