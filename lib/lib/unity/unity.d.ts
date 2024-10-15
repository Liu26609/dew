import { battle_d } from "../battle/battle";
import { body_base } from "./base/body_base";
export declare class unity extends body_base {
    constructor(data: any);
    private init;
    /**此单位战斗回合开始 */
    battle_round_begins(bt: battle_d): void;
}
