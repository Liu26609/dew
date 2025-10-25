export interface BaseRequest {
    /** 基础请求接口 */
}

export interface BaseResponse {
    /** 基础响应接口 */
}

export interface BaseConf {
    /** 是否为开放API，如果为true，则不进行用户认证 */
    openApi?: boolean;
}