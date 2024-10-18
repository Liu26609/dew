import { template } from "../../../shared/master/MsgAction";
import common from "../common";
import ET, { ET_K } from "../ET";
import { battle_group } from "../face/FACE_BODY";
import { SKILL_eff_type } from "../face/FACE_SKILL";
import { body_base } from "../unity/base/body_base";
import { player } from "../unity/player";
let counter = 1;
/**
 * 战场
 */
export class battle {
    private createTime: number = Date.now();
    round: number = 1;
    private groupMap: Map<string, body_base>[] = [new Map(), new Map()];
    id: number = counter++
    private _active: boolean = false;
    private _sklog: any = [{}, {}]; // 技能日志
    private _killlog: Map<string, { tag: string, round: number, use: string }> = new Map();
    private _datalog: any = [{}, {}]; //战斗总计数据

    // 回合日志
    private _sklog_round: any = [{}, {}];
    private _killlog_round: Map<string, { tag: string, round: number, use: string }> = new Map();
    private _datalog_round: any = [{}, {}];

    moment: boolean = false;
    private _listen = {};
    /**
     * 战斗各单位奖励
     */
    private _gift: Map<string, any[]> = new Map();
    /**
     * 是否瞬间完成
     * @param moment 
     */
    constructor(moment = true) {
        this.moment = moment;
        this.createTime = Date.now();
        console.info(`[战场]创建:${this.id}#${this.createTime}`)

        ET.fire(ET_K.battle_create, this)

    }
    // 通知全体玩家
    notice_all(msg: string) {
        this.groupMap.forEach(element => {
            element.forEach(item => {
                if (item instanceof player) {
                    item.sendMessageg('Action',{template:template.文本消息,data:`[战场]${msg}`,messageId:''});
                }
            });
        });
    }
    destroy() {
        this._active = false;
        ET.fire(ET_K.battle_destroy, this.id);
        this.groupMap.forEach(element => {
            element.forEach(item => {
                item.set_battle(undefined)
                item.set_battleLs(undefined)
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
    addGift(id: string, item: any) {
        this._gift.set(id, item)
    }
    log_data(key: string, group: battle_group, name: string, val: number) {
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
    log_kill(name: string, tag: string) {
        this._killlog.set(common.v4(), { tag, round: this.round, use: name })

        // 回合数据
        this._killlog_round.set(common.v4(), { tag, round: this.round, use: name })
    }
    log(group: battle_group, useName: string, skName: string, logs: { key: string, val: any }[]) {

        try {
            if (!this._sklog[group][useName]) {
                this._sklog[group][useName] = {};
            }

            if (!this._sklog[group][useName][skName]) {
                this._sklog[group][useName][skName] = [];
            }

            logs.forEach(log => {
                const existingLog = this._sklog[group][useName][skName].find((l: { key: string, val: any }) => l.key === log.key);
                if (existingLog && typeof existingLog.val === 'number' && typeof log.val === 'number') {
                    existingLog.val += log.val;
                } else {
                    this._sklog[group][useName][skName].push(log);
                }
            });
        } catch (e) {
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
                const existingLog = this._sklog_round[group][useName][skName].find((l: { key: string, val: any }) => l.key === log.key);
                if (existingLog && typeof existingLog.val === 'number' && typeof log.val === 'number') {
                    existingLog.val += log.val;
                } else {
                    this._sklog_round[group][useName][skName].push(log);
                }
            });
        } catch (e) {
            debugger;
        }

    }


    get_log(group: battle_group) {
        let g = group == battle_group.主场 ? [battle_group.主场, battle_group.客场] : [battle_group.客场, battle_group.主场]
        return {
            skLog: [this._sklog[g[0]], this._sklog[g[1]]],
            killLog: [...this._killlog.values()],
            dataLog: [this._datalog[g[0]], this._datalog[g[1]]]
        }
    }
    /**
     * 获取回合数据
     */
    get_round_log(group: battle_group) {
        // 将输入的group 排在前面
        let g = group == battle_group.主场 ? [battle_group.主场, battle_group.客场] : [battle_group.客场, battle_group.主场]
        return {
            skLog: [this._sklog_round[g[0]], this._sklog_round[g[1]]],
            killLog: [...this._killlog_round.values()],
            dataLog: [this._datalog_round[g[0]], this._datalog_round[g[1]]]
        }
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
        if (this.round > 600) {
            console.log('战斗超时回合超过限制')
            return
        }
        this.clear_round_log();
        for (let i = 0; i < this.groupMap.length; i++) {
            const element = this.groupMap[i];
            element.forEach(tick => {
                if (tick.is_die()) {
                    // 单位死亡
                    return;
                }
                tick.battle_round_begins(this)
                tick.battle_round_end(this)
            });
        }
        this.round++;
        // 如果主场或客场一方单位都死亡/或者没有单位了，则结束战斗
        const homeGroupAlive = Array.from(this.groupMap[battle_group.主场].values()).some(unit => !unit.is_die());
        const awayGroupAlive = Array.from(this.groupMap[battle_group.客场].values()).some(unit => !unit.is_die());
        const homeGroupEmpty = this.groupMap[battle_group.主场].size == 0;
        const awayGroupEmpty = this.groupMap[battle_group.客场].size == 0;

        if((!homeGroupAlive)){
            this.allDie(battle_group.主场);
        }
        if((!awayGroupAlive)){
            this.allDie(battle_group.客场);
        }

        if ((!homeGroupAlive || !awayGroupAlive) || (homeGroupEmpty && awayGroupEmpty)) {
            console.info(`[战场]战斗结束:${this.id}#${this.createTime}`);
            this.game_over();
            return;
        }
        this.callListen('rund', [])
        console.log(`回合:${this.round}结束`)
    }
    private allDie(winG: battle_group) {
        this.callListen('allDie', [winG])
    }
    private callListen(key: string, data: any[]) {
        this._listen[key] && this._listen[key](this, ...data)

        this.groupMap.forEach(element => {
            element.forEach(item => {
                let ls = item.get_battleLs()
                if(!ls){
                    return;
                }
                ls[key] && ls[key](this, ...data)
            });
        });
    }
    private game_over() {
        this.callListen('game_over', [])
        ET.fire(ET_K.battle_over, this);
        this.destroy();
    }
    get_absGroup(g: battle_group) {
        // 取相反
        let g2 = g == battle_group.主场 ? battle_group.客场 : battle_group.主场;
        return this.groupMap[g2];
    }
    set_listen(listen?: {}) {
        if (listen) {
            this._listen = listen;
        }
    }
    start() {
        this.active(true)
        if (this.groupMap[battle_group.主场].size == 0 || this.groupMap[battle_group.客场].size == 0) {
            console.info('无法启动战斗')
            return;
        }
        console.info(`[战场]战斗开始:${this.id}`)
        if (this.moment) {
            while (this._active) {
                this.tick();
            }
        }
    }
    private active(b: boolean) {
        this._active = b;
    }

    /**
     * 加入战场
     */
    join(g: battle_group, b: body_base) {
        b.set_group(g);
        b.set_battle(this);
        this.groupMap[g].set(b.id, b);
        if(this._active){
            this.notice_all(`玩家[${b.name}]加入了战斗!`)
        }
    }
    /**
     * 离开战场
     */
    out(b: body_base) {
        b.set_group(battle_group.主场);
        b.set_battle(undefined);
        this.groupMap[b.get_group()].delete(b.id);
    }
    leave(b: body_base) {
        this.notice_all(`玩家[${b.name}]悄悄的逃跑了`)
        this.out(b)

    }
}