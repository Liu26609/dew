

export enum Item_Type{
  经验,
  技能书,
  装备,
  道具,
}
export interface prop_item{
  name:string 
  // 自识别是否可叠加
  type:Item_Type
  cont?:number
  data?;
}