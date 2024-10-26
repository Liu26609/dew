"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsxToJson_1 = __importDefault(require("../../model/xlsxToJson"));
const MsgAction_1 = require("../../shared/master/MsgAction");
const PtlFace_1 = require("../../shared/PtlFace");
const battle_1 = require("../lib/battle/battle");
const common_1 = __importDefault(require("../lib/common"));
const FACE_BODY_1 = require("../lib/face/FACE_BODY");
const word_1 = __importDefault(require("../lib/word"));
const user_1 = __importDefault(require("./user"));
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
        this._pgs = new Map();
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
            log_kill: (c, win, die) => {
                if (win.id == p.id) {
                    c.addGift(p.id, { name: '💠探索进度', cont: 1, type: PtlFace_1.Item_Type.none });
                    this.add_pgs(p.id, data.length);
                }
            },
            allDie: (c, win) => {
                // if (win == battle_group.主场) {
                //     console.log('探索战斗结束玩家胜利')
                // } else {
                //     console.log('探索战斗结束怪物胜利')
                // }
            },
            destroy: (c) => {
                console.log('探索战斗结束', c.win, 'win');
                if (c.win == FACE_BODY_1.battle_group.主场) {
                    p.set_battleCall(undefined);
                }
            }
        });
        return b;
    }
    add_pgs(id, num) {
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
        let online = user_1.default.locaHas(id);
        if (online) {
            // 延时1秒发送消息
            online.sendMessageg('Action', {
                template: MsgAction_1.template.文本消息,
                data: '探索进度已经满,开始结算探索奖励...(开发中无内容)',
                messageId: '',
                delaytime: 0.5
            });
        }
        else {
            console.log('探索奖励结算,但用户已经不在线');
            return;
        }
        this._pgs.set(id, -1);
    }
    get_pgs(id) {
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
    active(id) {
        if (!this._pgs.has(id)) {
            this._pgs.set(id, 0);
        }
        this._players.set(id, Date.now());
    }
    leave(id) {
        this.add_pgs(id, 0);
        this._pgs.delete(id);
        this._players.delete(id);
    }
    get_info(id) {
        return {
            pgs: this.get_pgs(id),
        };
    }
}
exports.default = game_map;
