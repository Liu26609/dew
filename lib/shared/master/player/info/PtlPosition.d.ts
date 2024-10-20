import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
/**
 * 查看当前位置
 */
export interface ReqPosition extends BaseRequest {
}
export interface ResPosition extends BaseResponse {
    /**副本名称 */
    name: string;
    /**副本在线玩家数 */
    online: number;
    /**探索进度 */
    pgs: number;
}
export declare const conf: BaseConf;
