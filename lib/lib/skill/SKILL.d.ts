import { battle_d } from "../battle/battle";
import { SKILL_rang, SKILL_target, SKILL_type } from "../face/FACE_SKILL";
import { unity } from "../unity/unity";
import { effect } from "./effect/effect_base";
export declare class SKILL {
    name: string;
    id: string;
    type: SKILL_type.主动技能;
    effects: effect[];
    /**
     * 技能目标
     */
    target: SKILL_target;
    rang_type: SKILL_rang;
    rang_num: number;
    /**
     * tag
     * data
     */
    private _log;
    constructor(data: any);
    clearLog(): void;
    log(tpl: string, val: string | number): void;
    /**
     * 是否能够释放技能
     */
    can_use(bt: battle_d): void;
    use(use: unity, bt: battle_d): void;
    /**
     * 获取目标群体
     */
    private get_target;
    /**
     * 获取目标群体
     */
    private get_target_rang;
}
