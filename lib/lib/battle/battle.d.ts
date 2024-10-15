import { battle_group } from "../face/FACE_BODY";
import { unity } from "../unity/unity";
/**
 * 战场
 */
export declare class battle_d {
    private createTime;
    private round;
    private groupMap;
    id: number;
    private _active;
    private _log;
    constructor();
    log(log: string): void;
    /**
     * 执行帧 - 执行一回合
     */
    tick(): void;
    print_log(): void;
    private game_over;
    get_absGroup(g: battle_group): Map<string, unity>;
    start(): void;
    private active;
    destroy(): void;
    /**
     * 加入战场
     */
    join(g: battle_group, b: unity): void;
    /**
     * 离开战场
     */
    out(b: unity): void;
}
