export enum attKey{
    当前生命值 = 'hp_now',
    最大生命值 = 'hp_max',
    生命恢复 = 'hp_res',
    当前魔法值 = 'mp_now', 
    最大魔法值 = 'mp_max',
    魔法恢复 = 'mp_res',
    最小物理伤害 = 'phy_min',
    最大物理伤害 = 'phy_max'
}

export interface platformInfo{
    id:string,
    name:string
}

export interface IAttribute{
    // 生命
    hp_now:number,
    hp_max:number,
    hp_res:number
    // 蓝量
    mp_now:number,
    mp_max:number,
    mp_res:number,
    // 物理伤害
    phy_min:number,
    phy_max:number
}