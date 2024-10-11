import { rank_type, taskKey } from "../../../shared/interface";
import { template } from "../../../shared/master/MsgAction";
import { baseBody } from "../../../model/fight/body/baseBody";
import { calls } from "../../../model/fight/body/calls";
import { enemy } from "../../../model/fight/body/enemy";
import { pet } from "../../../model/fight/body/pet";
import { player, wallet_key } from "../../../model/fight/body/player";


class manage_task {
    constructor() {

    }
    event(k: taskKey, cont: number, active: baseBody, onactive?: baseBody) {
        if (cont == 0) {
            return;
        }

        let _acitve = active as player;
        if (active instanceof calls) {
            _acitve = active.get_Master() as player;
        } else if (active instanceof pet) {
            _acitve = active.get_Master() as player;
        } else if (active instanceof player) {

        } else {
            return;
        }
        switch (k) {
            case taskKey.击杀普通怪物:
                _acitve.getWordTask()?.onKillEnemy(_acitve, onactive as enemy);
                break;
            case taskKey.成功捕捉宠物:
                _acitve.getWordTask()?.onCatchPet(active, onactive as enemy);
                break;
            case taskKey.移动到未知位置:
                _acitve.getWordTask()?.onMove();
                break;
            case taskKey.成功打开宝箱:
                _acitve.getWordTask()?.onOpenBox(_acitve as player);
                break;
            case taskKey.砍树次:
                _acitve.getWordTask()?.onChopping();
                break;
            case taskKey.钓到鱼只:
                _acitve.getWordTask()?.onFishing();
                break;
            default:
                break;
        }



        // 每日委托检测
        _acitve.get_newbieTask()?.tick(k, _acitve, cont);
        _acitve.get_entrustTask()?.tick(k, _acitve, cont);
        _acitve.get_everweekTask()?.tick(k, _acitve, cont);
        _acitve.get_everdayTask()?.tick(k, _acitve, cont);

    }
}
export default new manage_task();