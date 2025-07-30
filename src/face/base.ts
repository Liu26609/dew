export interface _BaseRequest {
    _token?:string
    _player?:any
}

export interface _BaseResponse {
    _token?:string
}

export interface _BaseConf {
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