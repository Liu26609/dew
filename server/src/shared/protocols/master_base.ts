export interface BaseRequest{
    _player?:any,
    /**
     * 用户id
     */
    _onlyid?:string,
    /**
     * 来源编号
     * 子频道号,qq群号等.
     */
    _fromid?:string,
    /**
     * *必填 来源平台
     */
    _platform?:string
}
export interface BaseResponse{

}
export interface BaseConf{
    /**
     * 是否检查用户唯一ID
     */
    check_onlyid:boolean
    /**
     * 接口是否需要加入小队才能访问
     */
    check_team?:boolean
    /**
     * 接口是否需要没有在战斗才能访问
     */
    check_notBattle?:boolean
    /**
     * 是否需要检测是否有指定功能的npc
     */
    check_npc?:string
}