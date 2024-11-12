import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";
//查看账号绑定信息
export interface ReqLook extends BaseRequest {
    
}

export interface ResLook extends BaseResponse {
    logs:{id:string,bind_id:string,platform:string,time:number}[]
}

export const conf: BaseConf = {
    check_onlyid: true
}