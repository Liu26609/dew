export interface prop_item_equip {
    name: string;
    att: any;
    sys: string;
    tips: string;
}
export interface prop_item_skill {
    /**技能名称 */
    name: string;
    /**
     * 技能cd
     */
    cd: number;
    /**
     * 0 主动技能,
     * 1 被动技能
     */
    type: number;
    /**技能描述 */
    desc: string;
}
export declare enum Item_Type {
    经验 = 0,
    技能书 = 1,
    装备 = 2,
    道具 = 3,
    none = 4
}
