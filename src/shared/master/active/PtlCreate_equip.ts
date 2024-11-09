import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";

export interface ReqCreate_equip extends BaseRequest {
    cont: number;  // 祈愿次数
}

export interface ResCreate_equip extends BaseResponse {
    
}

export const conf: BaseConf = {
    check_onlyid: true
}