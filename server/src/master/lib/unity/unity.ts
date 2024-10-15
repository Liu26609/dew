import { battle } from "../battle/battle";
import { body_base } from "./base/body_base";

export class unity extends body_base {
    constructor(data) {
        super()
        this.init(data)
    }
    private init(data: any) {
        this._reload(data);
    }
    /**此单位战斗回合开始 */
    battle_round_begins(bt: battle) {
        if (this.is_die()) {
            return;
        }
        /**
         * 2.目标选择 - 技能决定
         * 3.技能释放
         */
        // 1.技能选择 - ai训练
        let sk = this.sk_active[0];
        // 2.技能释放 - 目标选择技能决定
        sk.use(this,bt);
    }
}