export interface BaseRequest {
    _token?:string
    _player?:any
}

export interface BaseResponse {
    _token?:string
}

export interface BaseConf {
    /**
     * 不加载用户数据
     */
    _notLoadPlayer?:boolean
    /**
     * 无视离线
     */
    _notCheckOff?:boolean
}

export interface BaseMessage {
    
}