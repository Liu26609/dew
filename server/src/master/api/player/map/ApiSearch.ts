import { ApiCall } from "tsrpc";
import { player } from "../../../lib/unity/player";
import { battle } from "../../../lib/battle/battle";
import { _att_key, Item_Type } from "../../../../shared/shareFace";
import { MSG_BATTLELOG, template } from "../../../../shared/master/MsgAction";
import { ReqSearch, ResSearch } from "../../../../shared/master/player/map/PtlSearch";
import { body_base } from "../../../lib/unity/base/body_base";

/**
 * 1.随机匹配怪物
 * 2.随机匹配玩家
 * 3.随机获得奖励
 * @param call 
 */
export default async function (call: ApiCall<ReqSearch, ResSearch>) {
    let p = call.req._player as player;
    let map = p.getMap();
    if(map.name == '主神空间'){
        // 你还没有进入任何世界,你可以:
        // $at输入[开始历练]进入与你实力匹配的世界
        // $at输入曾进入过的世界名
        let text = `你还没有进入任何世界,你可以:
$at输入[开始历练]进入与你实力匹配的世界
$at输入[开始历练 + 世界名]进入指定世界`;
        p.sendMessageg('Action',{
            template:template.文本消息,
            messageId:'',
            data:text
        })
        call.error('没有进入任何世界')
        return;
    }
    let res = map.search(p);

    let resData:any[] = [];
    let ls = {
        game_over: (b: battle) => {
            console.log('探索战斗结束')
            let log = b.get_log(p.get_group());
            let gitfs = b.getGift(p.id);
            let data:MSG_BATTLELOG = {
                title: "战斗结束",
                tips: `探索战斗结束`,
                round: b.round,
                skLog: log.skLog,
                dataLog: log.dataLog,
                killLog: log.killLog,
                gitfs: gitfs,
            }
            p.addItem(gitfs)
            p.sendMessageg('Action', {
                template: template.战斗日志,
                data:data,
                messageId: ""
            })
        },
        // 监听谁击杀了谁
        log_kill:(b: battle,win:body_base,die:body_base) =>{
            if(win.id == p.id){
                let killLeve = die.get_att(_att_key.等级)?.getVal();
                b.addGift(win.id,{ name: '金币', cont: 1,type:Item_Type.道具 })
                b.addGift(win.id,{ name: 'EXP', cont: killLeve,type:Item_Type.道具 })
            }
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