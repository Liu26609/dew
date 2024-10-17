import { ServiceProto } from 'tsrpc-proto';
import { ReqOut, ResOut } from './battle/PtlOut';
import { ReqBattle, ResBattle } from './debug/PtlBattle';
import { ReqPvp, ResPvp } from './debug/PtlPvp';
import { ReqSave, ResSave } from './debug/PtlSave';
import { MsgAction } from './MsgAction';
import { ReqGetBase, ResGetBase } from './player/info/PtlGetBase';
import { ReqSetName, ResSetName } from './player/info/PtlSetName';
import { ReqMiss, ResMiss } from './PtlMiss';
import { ReqPing, ResPing } from './PtlPing';
import { ReqBuild, ResBuild } from './work/PtlBuild';
export interface ServiceType {
    api: {
        "battle/Out": {
            req: ReqOut;
            res: ResOut;
        };
        "debug/Battle": {
            req: ReqBattle;
            res: ResBattle;
        };
        "debug/Pvp": {
            req: ReqPvp;
            res: ResPvp;
        };
        "debug/Save": {
            req: ReqSave;
            res: ResSave;
        };
        "player/info/GetBase": {
            req: ReqGetBase;
            res: ResGetBase;
        };
        "player/info/SetName": {
            req: ReqSetName;
            res: ResSetName;
        };
        "Miss": {
            req: ReqMiss;
            res: ResMiss;
        };
        "Ping": {
            req: ReqPing;
            res: ResPing;
        };
        "work/Build": {
            req: ReqBuild;
            res: ResBuild;
        };
    };
    msg: {
        "Action": MsgAction;
    };
}
export declare const serviceProto: ServiceProto<ServiceType>;
