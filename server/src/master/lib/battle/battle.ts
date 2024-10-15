import ET, { ET_K } from "../ET";
import { battle_group } from "../face/FACE_BODY";
import { body_base } from "../unity/base/body_base";
let counter = 1;
/**
 * 战场
 */
export class battle {
    private createTime: number = Date.now();
    private round: number = 1;
    private groupMap: Map<string, body_base>[] = [new Map(), new Map()];
    id: number = counter++
    private _active: boolean = false;
    private _log:string[] = [];
    moment:boolean = false;
    /**
     * 是否瞬间完成
     * @param moment 
     */
    constructor(moment = true) {
        this.moment = moment;
        this.createTime = Date.now();
        console.info(`[战场]创建:${this.id}#${this.createTime}`)

        ET.fire(ET_K.battle_create,this)
    }
    log(log:string){
        this._log.push(log);
    }
    /**
     * 执行帧 - 执行一回合
     */
    tick() {
        if(!this._active){
            return;
        }
        
        for (let i = 0; i < this.groupMap.length; i++) {
            const element = this.groupMap[i];
            element.forEach(tick => {
                if(tick.is_die()){
                    // 单位死亡
                    this.out(tick)
                    return;
                }
                tick.battle_round_begins(this)
            });
        }
        this.round++;
        // 如果主场或客场一方单位都死亡/或者没有单位了，则结束战斗
        const homeGroupAlive = Array.from(this.groupMap[battle_group.主场].values()).some(unit => !unit.is_die());
        const awayGroupAlive = Array.from(this.groupMap[battle_group.客场].values()).some(unit => !unit.is_die());
        const homeGroupEmpty = this.groupMap[battle_group.主场].size == 0;
        const awayGroupEmpty = this.groupMap[battle_group.客场].size == 0;

        if ((!homeGroupAlive && !awayGroupAlive) || (!homeGroupEmpty && !awayGroupEmpty)) {
            console.info(`[战场]战斗结束:${this.id}#${this.createTime}`);
            this.game_over();
        }
    }
    print_log(){
        let str = `------------\n`;

        this._log.forEach(item => {
            str += `${item}\n`
        })
        str += `-----------`
        console.info(str)
    }
    private game_over(){
        this.print_log();
        ET.fire(ET_K.battle_over,this);
        this.destroy();
    }
    get_absGroup(g:battle_group){
        // 取相反
        let g2 = g == battle_group.主场 ? battle_group.客场 : battle_group.主场;
        return this.groupMap[g2];
    }
    start(){
        this.active(true)

        if(this.groupMap[battle_group.主场].size == 0 || this.groupMap[battle_group.客场].size == 0){
            console.info('无法启动战斗')
            return;
        }
        console.info(`[战场]战斗开始:${this.id}`)
        if(this.moment){
            while(this._active){
                this.tick();
            }
        }
    }
    private active(b:boolean){
        this._active = b;
    }
    destroy() {
        this._active = false;
        ET.fire(ET_K.battle_destroy,this.id);
        this.groupMap = [];
    }
    /**
     * 加入战场
     */
    join(g: battle_group, b: body_base) {
        b.set_group(g);
        this.groupMap[g].set(b.id, b);
        this.log(`${b.name}加入了战斗`)
        console.info(`[战场]${b.name}加入战斗#g-${g}`)
    }
    /**
     * 离开战场
     */
    out(b: body_base) {
        if(b.is_die()){
            console.log(`${b.name}死亡`)
            // 附加奖励到战场
        }else{
            console.log(`${b.name}逃离了战场`)
        }
        b.set_group(battle_group.主场);
        this.groupMap[b.get_group()].delete(b.id);
    }
}