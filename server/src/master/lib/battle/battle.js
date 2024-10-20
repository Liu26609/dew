"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.battle = void 0;
const MsgAction_1 = require("../../../shared/master/MsgAction");
const shareFace_1 = require("../../../shared/shareFace");
const common_1 = __importDefault(require("../common"));
const ET_1 = __importStar(require("../ET"));
const FACE_BODY_1 = require("../face/FACE_BODY");
const player_1 = require("../unity/player");
let counter = 1;
/**
 * 战场
 */
class battle {
    /**
     * 是否瞬间完成
     * @param moment
     */
    constructor(moment = true) {
        this.createTime = Date.now();
        this.round = 1;
        this.groupMap = [new Map(), new Map()];
        this.id = counter++;
        this._active = false;
        this._sklog = [{}, {}]; // 技能日志
        this._killlog = new Map();
        this._datalog = [{}, {}]; //战斗总计数据
        // 回合日志
        this._sklog_round = [{}, {}];
        this._killlog_round = new Map();
        this._datalog_round = [{}, {}];
        this.moment = false;
        this._listen = {};
        /**
         * 战斗各单位奖励
         */
        this._gift = new Map();
        this.moment = moment;
        this.createTime = Date.now();
        console.info(`[战场]创建:${this.id}#${this.createTime}`);
        ET_1.default.fire(ET_1.ET_K.battle_create, this);
    }
    // 通知全体玩家
    notice_all(msg) {
        this.groupMap.forEach(element => {
            element.forEach(item => {
                if (item instanceof player_1.player) {
                    item.sendMessageg('Action', { template: MsgAction_1.template.文本消息, data: `[战场]${msg}`, messageId: '' });
                }
            });
        });
    }
    destroy() {
        this._active = false;
        ET_1.default.fire(ET_1.ET_K.battle_destroy, this.id);
        this.groupMap.forEach(element => {
            element.forEach(item => {
                item.set_battle(undefined);
                item.set_battleLs(undefined);
            });
        });
        this.groupMap = [];
        // 销毁对象将其从内存中移除
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                delete this[key];
            }
        }
    }
    addGift(id, item) {
        let list = this._gift.get(id) || [];
        if (item.type == shareFace_1.Item_Type.道具) {
            let existingItem = list.find((i) => i.name === item.name);
            if (existingItem) {
                existingItem.cont += item.cont;
            }
            else {
                list.push(item);
            }
        }
        else {
            list.push(item);
        }
        this._gift.set(id, list);
    }
    getGift(id, rm = true) {
        let list = [];
        list = this._gift.get(id) || [];
        if (rm) {
            this._gift.delete(id);
        }
        return list;
    }
    log_data(key, group, name, val) {
        if (!this._datalog[group][key]) {
            this._datalog[group][key] = {};
        }
        if (!this._datalog[group][key][name]) {
            this._datalog[group][key][name] = 0;
        }
        this._datalog[group][key][name] += val;
        // 回合数据
        if (!this._datalog_round[group][key]) {
            this._datalog_round[group][key] = {};
        }
        if (!this._datalog_round[group][key][name]) {
            this._datalog_round[group][key][name] = 0;
        }
        this._datalog_round[group][key][name] += val;
    }
    log_kill(win, die) {
        this._killlog.set(common_1.default.v4(), { tag: die.name, round: this.round, use: win.name });
        // 回合数据
        this._killlog_round.set(common_1.default.v4(), { tag: die.name, round: this.round, use: win.name });
        this.callListen('log_kill', [win, die]);
    }
    log(group, useName, skName, logs) {
        try {
            if (!this._sklog[group][useName]) {
                this._sklog[group][useName] = {};
            }
            if (!this._sklog[group][useName][skName]) {
                this._sklog[group][useName][skName] = [];
            }
            logs.forEach(log => {
                const existingLog = this._sklog[group][useName][skName].find((l) => l.key === log.key);
                if (existingLog && typeof existingLog.val === 'number' && typeof log.val === 'number') {
                    existingLog.val += log.val;
                }
                else {
                    this._sklog[group][useName][skName].push(log);
                }
            });
        }
        catch (e) {
            debugger;
        }
        // 回合数据
        try {
            if (!this._sklog_round[group][useName]) {
                this._sklog_round[group][useName] = {};
            }
            if (!this._sklog_round[group][useName][skName]) {
                this._sklog_round[group][useName][skName] = [];
            }
            logs.forEach(log => {
                const existingLog = this._sklog_round[group][useName][skName].find((l) => l.key === log.key);
                if (existingLog && typeof existingLog.val === 'number' && typeof log.val === 'number') {
                    existingLog.val += log.val;
                }
                else {
                    this._sklog_round[group][useName][skName].push(log);
                }
            });
        }
        catch (e) {
            debugger;
        }
    }
    get_log(group) {
        let g = group == FACE_BODY_1.battle_group.主场 ? [FACE_BODY_1.battle_group.主场, FACE_BODY_1.battle_group.客场] : [FACE_BODY_1.battle_group.客场, FACE_BODY_1.battle_group.主场];
        return {
            skLog: [this._sklog[g[0]], this._sklog[g[1]]],
            killLog: [...this._killlog.values()],
            dataLog: [this._datalog[g[0]], this._datalog[g[1]]]
        };
    }
    /**
     * 获取回合数据
     */
    get_round_log(group) {
        // 将输入的group 排在前面
        let g = group == FACE_BODY_1.battle_group.主场 ? [FACE_BODY_1.battle_group.主场, FACE_BODY_1.battle_group.客场] : [FACE_BODY_1.battle_group.客场, FACE_BODY_1.battle_group.主场];
        return {
            skLog: [this._sklog_round[g[0]], this._sklog_round[g[1]]],
            killLog: [...this._killlog_round.values()],
            dataLog: [this._datalog_round[g[0]], this._datalog_round[g[1]]]
        };
    }
    // 清空回合数据
    clear_round_log() {
        this._sklog_round = [{}, {}];
        this._killlog_round = new Map();
        this._datalog_round = [{}, {}];
    }
    /**
     * 执行帧 - 执行一回合
     */
    tick() {
        if (!this._active) {
            return;
        }
        if (this.round > 1000) {
            console.log('战斗超时回合超过限制');
            debugger;
            return;
        }
        this.clear_round_log();
        for (let i = 0; i < this.groupMap.length; i++) {
            const element = this.groupMap[i];
            element.forEach(tick => {
                if (tick.is_die()) {
                    // 单位死亡
                    return;
                }
                tick.battle_round_begins(this);
                tick.battle_round_end(this);
            });
        }
        this.round++;
        // 如果主场或客场一方单位都死亡/或者没有单位了，则结束战斗
        const homeGroupAlive = Array.from(this.groupMap[FACE_BODY_1.battle_group.主场].values()).some(unit => !unit.is_die());
        const awayGroupAlive = Array.from(this.groupMap[FACE_BODY_1.battle_group.客场].values()).some(unit => !unit.is_die());
        const homeGroupEmpty = this.groupMap[FACE_BODY_1.battle_group.主场].size == 0;
        const awayGroupEmpty = this.groupMap[FACE_BODY_1.battle_group.客场].size == 0;
        if ((!homeGroupAlive)) {
            this.allDie(FACE_BODY_1.battle_group.主场);
        }
        if ((!awayGroupAlive)) {
            this.allDie(FACE_BODY_1.battle_group.客场);
        }
        if ((!homeGroupAlive || !awayGroupAlive) || (homeGroupEmpty && awayGroupEmpty)) {
            console.info(`[战场]战斗结束:${this.id}#${this.createTime}`);
            this.game_over();
            return;
        }
        this.callListen('rund', []);
    }
    allDie(winG) {
        this.callListen('allDie', [winG]);
    }
    callListen(key, data) {
        this._listen[key] && this._listen[key](this, ...data);
        this.groupMap.forEach(element => {
            element.forEach(item => {
                let ls = item.get_battleLs();
                if (!ls) {
                    return;
                }
                ls[key] && ls[key](this, ...data);
            });
        });
    }
    game_over() {
        this.callListen('game_over', []);
        ET_1.default.fire(ET_1.ET_K.battle_over, this);
        this.destroy();
    }
    get_absGroup(g) {
        // 取相反
        let g2 = g == FACE_BODY_1.battle_group.主场 ? FACE_BODY_1.battle_group.客场 : FACE_BODY_1.battle_group.主场;
        return this.groupMap[g2];
    }
    set_listen(listen) {
        if (listen) {
            this._listen = listen;
        }
    }
    start() {
        this.active(true);
        if (this.groupMap[FACE_BODY_1.battle_group.主场].size == 0 || this.groupMap[FACE_BODY_1.battle_group.客场].size == 0) {
            console.info('无法启动战斗');
            return;
        }
        console.info(`[战场]战斗开始:${this.id}`);
        if (this.moment) {
            while (this._active) {
                this.tick();
            }
        }
    }
    active(b) {
        this._active = b;
    }
    /**
     * 加入战场
     */
    join(g, b) {
        b.set_group(g);
        b.set_battle(this);
        this.groupMap[g].set(b.id, b);
        if (this._active) {
            this.notice_all(`玩家[${b.name}]加入了战斗!`);
        }
    }
    /**
     * 离开战场
     */
    out(b) {
        b.set_group(FACE_BODY_1.battle_group.主场);
        b.set_battle(undefined);
        this.groupMap[b.get_group()].delete(b.id);
    }
    leave(b) {
        this.notice_all(`玩家[${b.name}]悄悄的逃跑了`);
        this.out(b);
    }
}
exports.battle = battle;
