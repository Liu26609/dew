import common from "../common";
import ET, { ET_K } from "../ET";
import { battle_group } from "../face/FACE_BODY";
import { SKILL_eff_type } from "../face/FACE_SKILL";
import { body_base } from "../unity/base/body_base";
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
    private _killlog:Map<string,{tag:string,round:number,use:string}> = new Map();
    private _datalog: any = [{}, {}]; //战斗总计数据
    moment: boolean = false;
    private _listen = {};
    /**
     * 战斗各单位奖励
     */
    private _gift:Map<string,any[]> = new Map();
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
    addGift(id:string,item:any){
        this._gift.set(id,item)
    }
    log_data(key: string, group: battle_group, name: string, val: number) {
        if (!this._datalog[group][key]) {
            this._datalog[group][key] = {};
        }
        if (!this._datalog[group][key][name]) {
            this._datalog[group][key][name] = 0;
        }
        this._datalog[group][key][name] += val;
    }
    log_kill(name:string,tag:string){
        this._killlog.set(common.v4(),{tag,round:this.round,use:name})
    }
    log(group: battle_group, useName: string, skName: string, logs: { key: string, val: any }[]) {
        // logs.forEach(log => {
        //     if (log.key.includes(SKILL_eff_type.伤害类)) {
        //         if(!this._datalog[group][SKILL_eff_type.伤害类]){
        //             this._datalog[group][SKILL_eff_type.伤害类] = 0;
        //         }
        //         this._datalog[group][SKILL_eff_type.伤害类] += log.val;
        //     }
        // })

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
    }
    get_log() {
        return this._sklog
    }
    get_killlog(){
        return [...this._killlog.values()]
    }
    get_dataLog() {
        return this._datalog
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
        for (let i = 0; i < this.groupMap.length; i++) {
            const element = this.groupMap[i];
            element.forEach(tick => {
                if (tick.is_die()) {
                    // 单位死亡
                    this.out(tick)
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

        if ((!homeGroupAlive || !awayGroupAlive) || (homeGroupEmpty && awayGroupEmpty)) {
            console.log(this._datalog)
            console.info(`[战场]战斗结束:${this.id}#${this.createTime}`);
            this.game_over();
        }
    }
    print_log() {
        let str = `------------\n`;
        console.log(this._sklog[0])
        console.log(this._sklog[1])

        str += `-----------`
        console.info(str)
        // 玩家|[技能名称]伤害5500[技能名称1]治疗100
    }
    private game_over() {
        if (this._listen['game_over']) {
            this._listen['game_over'](this)
        }
        ET.fire(ET_K.battle_over, this);
        this.destroy();
    }
    get_absGroup(g: battle_group) {
        // 取相反
        let g2 = g == battle_group.主场 ? battle_group.客场 : battle_group.主场;
        return this.groupMap[g2];
    }
    start(listen?: {}) {
        if (listen) {
            this._listen = listen;
        }
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
    destroy() {
        this._active = false;
        ET.fire(ET_K.battle_destroy, this.id);
        this.groupMap = [];
    }
    /**
     * 加入战场
     */
    join(g: battle_group, b: body_base) {
        b.set_group(g);
        this.groupMap[g].set(b.id, b);
        console.info(`[战场]${b.name}加入战斗#g-${g}`)
    }
    /**
     * 离开战场
     */
    out(b: body_base) {
        if (b.is_die()) {
            console.log(`${b.name}死亡`)
            // 附加奖励到战场
        } else {
            console.log(`${b.name}逃离了战场`)
        }
        b.set_group(battle_group.主场);
        this.groupMap[b.get_group()].delete(b.id);
    }
}