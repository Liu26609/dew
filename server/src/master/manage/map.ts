import { battle } from "../lib/battle/battle";
import common from "../lib/common";
import { battle_group } from "../lib/face/FACE_BODY";
import { player } from "../lib/unity/player";
import word from "../lib/word";

export default class game_map {
    name: string = '主神空间';
    id: string = common.v4();
    private _players: Map<string, any> = new Map();
    private _searchs: Map<string, any> = new Map();
    constructor(data: any) {
        for (const key in data) {
            this[key] = data[key];
        }
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
            data.push(word.createMonster({}))
        }
        this._searchs.set(p.id, data);
        p.set_battleCall((data: player) => {
            return this.battle_monster(data);
        })
        return { type: 'monster', data: data };
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
            allDie: (c: battle, win: battle_group) => {
                if (win == battle_group.主场) {
                    console.log('探索战斗结束玩家胜利')
                    p.set_battleCall(undefined);
                }else{
                    console.log('探索战斗结束怪物胜利')
                }
            }
        })
        return b
    }
    get_playerCont() {
        return this._players.size;
    }
    active(id: string) {
        this._players.set(id, Date.now());
    }
    get_info(id: string) {

    }
}