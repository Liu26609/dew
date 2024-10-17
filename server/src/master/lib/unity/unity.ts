import { battle } from "../battle/battle";
import common from "../common";
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
        super.battle_round_begins(bt);
        if (this.is_die()) {
            return;
        }
        // 1.过滤出CD符合的技能
        let availableSkills = this.sk_active.filter(skill => skill.next_round() == 0);
        if (availableSkills.length === 0) {
            console.log('No cd skills');
            return;
        }
        
        // 1.技能选择 - 根据CD决定
        let sk = availableSkills[common.random(0,availableSkills.length-1)];
        // 2.技能释放 - 目标选择技能决定
        sk.use(this,bt);
    }
}