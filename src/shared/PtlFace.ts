import { _bar } from "./FACE_BODY"

export interface prop_item_equip {
    name: string
    att: any
    sys: string
    leve_strengthen: _bar
    tips: string
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
    /**技能等级 */
    leve: number;
    leve_exp: _bar;
}
export enum Item_Type {
    技能书,
    装备,
    道具,
    none,
}
export enum bag_getType {
    index,
    name
}
export interface _user_cfg{
    /**是否开启图片模式 */
    img:boolean
}