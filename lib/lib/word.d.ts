import { battle_d } from "./battle/battle";
import { effect } from "./skill/effect/effect_base";
/**
 * 事件管理器
 */
declare class word {
    private effectTempMap;
    battleMap: Map<number, battle_d>;
    private _start;
    constructor();
    start(): Promise<void>;
    private register_battle;
    private dregister_battle;
    private _et;
    createEffectByType(classPath: any, data: any): Promise<any>;
    /**
     * 获取技能效果
     * @param keys
     * @param data
     * @returns
     */
    get_effectTemp(keys: string[], data: any): effect;
    private _initSkillCl;
    private _initSkillCls;
    private _startBattleTick;
}
declare const _default: word;
export default _default;
