import xlsxToJson from "../../model/xlsxToJson";
import { template } from "../../shared/master/MsgAction";
import { Item_Type } from "../../shared/shareFace";
import { battle } from "../lib/battle/battle";
import common from "../lib/common";
import { battle_group } from "../lib/face/FACE_BODY";
import { player } from "../lib/unity/player";
import word from "../lib/word";
import user from "./user";

export default class game_map {
    name: string = '主神空间';
    id: string = ''
    leve: number = 1;
    diff: number = 1;
    _id: string = common.v4();
    private _players: Map<string, any> = new Map();
    private _searchs: Map<string, any> = new Map();
    private _monsterMap: Map<string, any> = new Map();
    private _pgs: Map<string, number> = new Map();
    constructor(id: string) {
        let cfgMap = xlsxToJson.cfg;
        let _mapInfo = cfgMap.get('mapCfg') as Map<string, any>;
        let mapInfo = _mapInfo.get(id)
        this.name = mapInfo.name;
        this.id = `map_${mapInfo.id}`;
        this.leve = mapInfo.leve;
        this.diff = mapInfo.diff;
    }
    /**
     * 探索
     */
    search(p: player) {
        /**
         * 创建怪物
         * 
         */
        let data: any = [];
        for (let i = 0; i < 5; i++) {
            data.push(word.createMonster(this._monsterMap.get('1'), { leve: this.leve, diff: this.diff }))
        }
        this._searchs.set(p.id, data);
        p.set_battleCall((data: player) => {
            return this.battle_monster(data);
        })
        return { type: 'monster', data: data };
    }
    set_monsterCfg(data: Map<string, any> | undefined) {
        if (!data) {
            return;
        }
        this._monsterMap = data;
    }
    battle_monster(p: player) {
        let data: any = this._searchs.get(p.id);
        let b = new battle(true)
        b.join(battle_group.主场, p)
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            b.join(battle_group.客场, element)
        }
        b.set_listen({
            log_kill: (c: battle, win: player, die: player) => {
                if (win.id == p.id) {
                    c.addGift(p.id, { name: '💠探索进度', cont: 1, type: Item_Type.none })
                    this.add_pgs(p.id, data.length);
                }
            },
            allDie: (c: battle, win: battle_group) => {
                // if (win == battle_group.主场) {
                //     console.log('探索战斗结束玩家胜利')
                // } else {
                //     console.log('探索战斗结束怪物胜利')
                // }
            },
            destroy: (c: battle) => {
                console.log('探索战斗结束',c.win,'win')

                if (c.win == battle_group.主场) {
                    p.set_battleCall(undefined)
                }
            }
        })
        return b
    }
    add_pgs(id: string, num) {
        let now = this._pgs.get(id);
        if (now == -1) {
            return;
        }
        if (now + num < 5) {
            this._pgs.set(id, now + num);
            return;
        }
        // 探索完成  如何奖励 如何通知
        // 发送完成探索 领取奖励
        // api 请求
        let online = user.locaHas(id);
        if (online) {
            // 延时1秒发送消息
            online.sendMessageg('Action', {
                template: template.文本消息,
                data: '探索进度已经满,开始结算探索奖励...(开发中无内容)',
                messageId: '',
                delaytime: 0.5
            })

        } else {
            console.log('探索奖励结算,但用户已经不在线')
            return;
        }
        this._pgs.set(id, -1);
    }
    get_pgs(id: string) {
        let now = this._pgs.get(id);
        if (now == -1) {
            return 100;
        }
        if (this.name == '主神空间') {
            return 100;
        }
        return this._pgs.get(id) || 0;
    }
    get_playerCont() {
        return this._players.size;
    }
    active(id: string) {
        if (!this._pgs.has(id)) {
            this._pgs.set(id, 0);
        }
        this._players.set(id, Date.now());
    }
    leave(id: string) {
        this.add_pgs(id, 0);
        this._pgs.delete(id);
        this._players.delete(id);
    }
    get_info(id: string) {
        return {
            pgs: this.get_pgs(id),
        }
    }
}