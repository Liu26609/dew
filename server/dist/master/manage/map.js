"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsxToJson_1 = __importDefault(require("../../model/xlsxToJson"));
const battle_1 = require("../lib/battle/battle");
const common_1 = __importDefault(require("../lib/common"));
const FACE_BODY_1 = require("../lib/face/FACE_BODY");
const word_1 = __importDefault(require("../lib/word"));
class game_map {
    constructor(id) {
        this.name = '主神空间';
        this.id = '';
        this.leve = 1;
        this.diff = 1;
        this._id = common_1.default.v4();
        this._players = new Map();
        this._searchs = new Map();
        this._monsterMap = new Map();
        let cfgMap = xlsxToJson_1.default.cfg;
        let _mapInfo = cfgMap.get('mapCfg');
        let mapInfo = _mapInfo.get(id);
        this.name = mapInfo.name;
        this.id = `map_${mapInfo.id}`;
        this.leve = mapInfo.leve;
        this.diff = mapInfo.diff;
    }
    /**
     * 探索
     */
    search(p) {
        /**
         * 创建怪物
         *
         */
        let data = [];
        for (let i = 0; i < 5; i++) {
            data.push(word_1.default.createMonster(this._monsterMap.get('1'), { leve: this.leve, diff: this.diff }));
        }
        this._searchs.set(p.id, data);
        p.set_battleCall((data) => {
            return this.battle_monster(data);
        });
        return { type: 'monster', data: data };
    }
    set_monsterCfg(data) {
        if (!data) {
            return;
        }
        this._monsterMap = data;
    }
    battle_monster(p) {
        let data = this._searchs.get(p.id);
        let b = new battle_1.battle(true);
        b.join(FACE_BODY_1.battle_group.主场, p);
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            b.join(FACE_BODY_1.battle_group.客场, element);
        }
        b.set_listen({
            allDie: (c, win) => {
                if (win == FACE_BODY_1.battle_group.主场) {
                    console.log('探索战斗结束玩家胜利');
                    p.set_battleCall(undefined);
                }
                else {
                    console.log('探索战斗结束怪物胜利');
                }
            }
        });
        return b;
    }
    get_playerCont() {
        return this._players.size;
    }
    active(id) {
        this._players.set(id, Date.now());
    }
    leave(id) {
        this._players.delete(id);
    }
    get_info(id) {
    }
}
exports.default = game_map;
