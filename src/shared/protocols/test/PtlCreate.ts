import { platformInfo } from "../../face/IBody";
import { BaseRequest, BaseResponse, BaseConf } from "../base";
/**
 * 测试 创建 用户
 */
export interface ReqCreate extends BaseRequest {
    info:platformInfo
}

export interface ResCreate extends BaseResponse {
    
}

export const conf: BaseConf = {
    
}