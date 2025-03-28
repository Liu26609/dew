export interface ISkill {
    id:string
    name:string
    desc:string
    type:IEkill_type
    data:any,
    effects:IEffect_data[]
    trigger:ITrigger[]
}
export enum ITrigger_key{
    受击时 = "受到攻击时",
    击杀单位 = "击杀单位时"
}
export interface ITrigger{ key: string,tr_logic:string, logic: string, effects: IEffect_data[] }
export interface IEffect{
    desc:string
}
export interface IEffect_data{
    temp:string,
    /**
     * 变动存储参数
     */
    data:any,
    /**
     * 计算公式
     */
    formula:string,
    [key: string]: any
}
export enum IEkill_type{
    主动技能,
    被动技能
}
// 参数1 = 35
// 充提差/充值金额 > 参数1
// 返奖率 > 参数2
// control 库存1 < 参数3  不能低于2800 不能超过3100
