import { BaseRequest, BaseResponse, BaseConf } from "../protocols/base";
/**停止服务器 */
export interface ReqStop extends BaseRequest {
    /**停服原因 */
    reason:string;
}

export interface ResStop extends BaseResponse {
    
}

export const conf: BaseConf = {
    
}