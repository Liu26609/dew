import { ApiCall } from "tsrpc";
import { ReqSearch, ResSearch } from "../../../shared/master/battle/PtlSearch";
import { player } from "../../lib/unity/player";
import { battle } from "../../lib/battle/battle";
import { MSG_BATTLELOG } from "../../../shared/interface";
import { template } from "../../../shared/master/MsgAction";

/**
 * 1.随机匹配怪物
 * 2.随机匹配玩家
 * 3.随机获得奖励
 * @param call 
 */
export default async function (call: ApiCall<ReqSearch, ResSearch>) {
    let p = call.req._player as player;
    let map = p.getMap();
    let res = map.search(p);

    let resData:any[] = [];
    let ls = {
        game_over: (b: battle) => {
            console.log('探索战斗结束')
            let log = b.get_log(p.get_group());
            let data:MSG_BATTLELOG = {
                title: "战斗结束",
                tips: `探索战斗结束`,
                round: b.round,
                skLog: log.skLog,
                dataLog: log.dataLog,
                killLog: log.killLog,
                gitfs: [{ name: '金币', cont: 1 }],
            }
            
            p.sendMessageg('Action', {
                template: template.战斗日志,
                data:data,
                messageId: ""
            })
        }
    }
    p.set_battleLs(ls)
 
    switch (res.type) {
        case 'monster':
            for (let i = 0; i < res.data.length; i++) {
                const element = res.data[i];
                resData.push({
                    name: element.name,
                })
            }
            break;
    
        default:
            break;
    }
    call.succ({
        type: 'monster',
        data: res.data
    });
}