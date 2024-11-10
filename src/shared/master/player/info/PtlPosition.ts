import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
/**
 * 查看当前位置
 */
export interface ReqPosition extends BaseRequest {
}

export interface ResPosition extends BaseResponse {
    battle:boolean
    pos:number[]
    /**副本名称 */
    name:string
    /**副本在线玩家数 */
    online:number
    list:any[]
}

export const conf: BaseConf = {
    check_onlyid: true
}