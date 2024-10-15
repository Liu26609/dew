import { battle_d } from "../../battle/battle";
import { _att_key, battle_group } from "../../face/FACE_BODY";
import { SKILL } from "../../skill/SKILL";
import { att_line, att_val, body_bar } from "./body_com";
export declare class body_base {
    id: string;
    name: string;
    attList: (att_line | att_val | body_bar)[];
    private _group;
    sk_auto: SKILL[];
    sk_active: SKILL[];
    constructor();
    set_group(g: battle_group): void;
    get_group(): battle_group;
    _reload(data?: any): void;
    pushSkill(data: any): void;
    private addSk_auto;
    private addSk_active;
    /**此单位战斗回合开始 */
    battle_round_begins(bt: battle_d): void;
    is_die(): boolean;
    get_att(key: _att_key | string): att_line | att_val | body_bar;
    damage(val: number): void;
}
