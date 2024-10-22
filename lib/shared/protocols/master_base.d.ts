export interface BaseRequest {
    _player?: any;
    /**
     * 用户id
     */
    _onlyid?: string;
    /**
     * 消息体编号
     * 溯源消息发送
     */
    _messageid?: string;
    /**
     * *必填 来源平台
     */
    _platform?: string;
}
export interface BaseResponse {
    sys?: string;
}
export interface BaseConf {
    /**
     * 是否检查用户唯一ID
     */
    check_onlyid: boolean;
}
