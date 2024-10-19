export declare enum Item_Type {
    经验 = 0,
    技能书 = 1,
    装备 = 2,
    道具 = 3
}
export interface prop_item {
    name: string;
    type: Item_Type;
    cont?: number;
    data?: any;
}
