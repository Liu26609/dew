import { ServiceProto } from 'tsrpc-proto';
import { ReqSign, ResSign } from './active/PtlSign';
import { ReqBattle, ResBattle } from './battle/PtlBattle';
import { ReqOut, ResOut } from './battle/PtlOut';
import { ReqGetBodySysCfg, ResGetBodySysCfg } from './common/PtlGetBodySysCfg';
import { ReqSkill, ResSkill } from './debug/bag/PtlSkill';
import { ReqBattle as ReqBattle_1, ResBattle as ResBattle_1 } from './debug/PtlBattle';
import { ReqPvp, ResPvp } from './debug/PtlPvp';
import { ReqSave, ResSave } from './debug/PtlSave';
import { ReqTakeOffEquip, ResTakeOffEquip } from './debug/PtlTakeOffEquip';
import { ReqUpequip, ResUpequip } from './debug/PtlUpequip';
import { MsgAction } from './MsgAction';
import { ReqList, ResList } from './player/bag/PtlList';
import { ReqLook, ResLook } from './player/bag/PtlLook';
import { ReqUse, ResUse } from './player/bag/PtlUse';
import { ReqList as ReqList_1, ResList as ResList_1 } from './player/equip/PtlList';
import { ReqLook as ReqLook_1, ResLook as ResLook_1 } from './player/equip/PtlLook';
import { ReqReName, ResReName } from './player/equip/PtlReName';
import { ReqTakeOff, ResTakeOff } from './player/equip/PtlTakeOff';
import { ReqGetBase, ResGetBase } from './player/info/PtlGetBase';
import { ReqPosition, ResPosition } from './player/info/PtlPosition';
import { ReqSetName, ResSetName } from './player/info/PtlSetName';
import { ReqInfo, ResInfo } from './player/inherit/PtlInfo';
import { ReqReset, ResReset } from './player/inherit/PtlReset';
import { ReqOut as ReqOut_1, ResOut as ResOut_1 } from './player/map/PtlOut';
import { ReqSearch, ResSearch } from './player/map/PtlSearch';
import { ReqStart, ResStart } from './player/map/PtlStart';
import { ReqList as ReqList_2, ResList as ResList_2 } from './player/skill/PtlList';
import { ReqLook as ReqLook_2, ResLook as ResLook_2 } from './player/skill/PtlLook';
import { ReqRename, ResRename } from './player/skill/PtlRename';
import { ReqRm, ResRm } from './player/skill/PtlRm';
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
        "common/GetBodySysCfg": {
            req: ReqGetBodySysCfg;
            res: ResGetBodySysCfg;
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
        "debug/TakeOffEquip": {
            req: ReqTakeOffEquip;
            res: ResTakeOffEquip;
        };
        "debug/Upequip": {
            req: ReqUpequip;
            res: ResUpequip;
        };
        "player/bag/List": {
            req: ReqList;
            res: ResList;
        };
        "player/bag/Look": {
            req: ReqLook;
            res: ResLook;
        };
        "player/bag/Use": {
            req: ReqUse;
            res: ResUse;
        };
        "player/equip/List": {
            req: ReqList_1;
            res: ResList_1;
        };
        "player/equip/Look": {
            req: ReqLook_1;
            res: ResLook_1;
        };
        "player/equip/ReName": {
            req: ReqReName;
            res: ResReName;
        };
        "player/equip/TakeOff": {
            req: ReqTakeOff;
            res: ResTakeOff;
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
        "player/inherit/Info": {
            req: ReqInfo;
            res: ResInfo;
        };
        "player/inherit/Reset": {
            req: ReqReset;
            res: ResReset;
        };
        "player/map/Out": {
            req: ReqOut_1;
            res: ResOut_1;
        };
        "player/map/Search": {
            req: ReqSearch;
            res: ResSearch;
        };
        "player/map/Start": {
            req: ReqStart;
            res: ResStart;
        };
        "player/skill/List": {
            req: ReqList_2;
            res: ResList_2;
        };
        "player/skill/Look": {
            req: ReqLook_2;
            res: ResLook_2;
        };
        "player/skill/Rename": {
            req: ReqRename;
            res: ResRename;
        };
        "player/skill/Rm": {
            req: ReqRm;
            res: ResRm;
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
