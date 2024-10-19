import { ServiceProto } from 'tsrpc-proto';
import { ReqSign, ResSign } from './active/PtlSign';
import { ReqBattle, ResBattle } from './battle/PtlBattle';
import { ReqOut, ResOut } from './battle/PtlOut';
import { ReqSkill, ResSkill } from './debug/bag/PtlSkill';
import { ReqBattle as ReqBattle_1, ResBattle as ResBattle_1 } from './debug/PtlBattle';
import { ReqPvp, ResPvp } from './debug/PtlPvp';
import { ReqSave, ResSave } from './debug/PtlSave';
import { MsgAction } from './MsgAction';
import { ReqGetBase, ResGetBase } from './player/info/PtlGetBase';
import { ReqPosition, ResPosition } from './player/info/PtlPosition';
import { ReqSetName, ResSetName } from './player/info/PtlSetName';
import { ReqSearch, ResSearch } from './player/map/PtlSearch';
import { ReqStart, ResStart } from './player/map/PtlStart';
import { ReqMiss, ResMiss } from './PtlMiss';
import { ReqPing, ResPing } from './PtlPing';
import { ReqBuild, ResBuild } from './work/PtlBuild';
export interface ServiceType {
    api: {
        "active/Sign": {
            req: ReqSign;
            res: ResSign;
        };
        "battle/Battle": {
            req: ReqBattle;
            res: ResBattle;
        };
        "battle/Out": {
            req: ReqOut;
            res: ResOut;
        };
        "debug/bag/Skill": {
            req: ReqSkill;
            res: ResSkill;
        };
        "debug/Battle": {
            req: ReqBattle_1;
            res: ResBattle_1;
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
        "player/info/Position": {
            req: ReqPosition;
            res: ResPosition;
        };
        "player/info/SetName": {
            req: ReqSetName;
            res: ResSetName;
        };
        "player/map/Search": {
            req: ReqSearch;
            res: ResSearch;
        };
        "player/map/Start": {
            req: ReqStart;
            res: ResStart;
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
