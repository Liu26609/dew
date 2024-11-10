import { ServiceProto } from 'tsrpc-proto';
import { ReqCreate_equip, ResCreate_equip } from './active/PtlCreate_equip';
import { ReqCreate_skill, ResCreate_skill } from './active/PtlCreate_skill';
import { ReqSign, ResSign } from './active/PtlSign';
import { ReqDel, ResDel } from './backend/skill/PtlDel';
import { ReqEdit, ResEdit } from './backend/skill/PtlEdit';
import { ReqEffect_list, ResEffect_list } from './backend/skill/PtlEffect_list';
import { ReqQuery_eff, ResQuery_eff } from './backend/skill/PtlQuery_eff';
import { ReqQuery, ResQuery } from './backend/skill/PtlQuery';
import { ReqSkill_list, ResSkill_list } from './backend/skill/PtlSkill_list';
import { ReqBattle, ResBattle } from './battle/PtlBattle';
import { ReqOut, ResOut } from './battle/PtlOut';
import { ReqGetBodySysCfg, ResGetBodySysCfg } from './common/PtlGetBodySysCfg';
import { ReqSetUp, ResSetUp } from './common/PtlSetUp';
import { ReqSkill, ResSkill } from './debug/bag/PtlSkill';
import { ReqBattle as ReqBattle_1, ResBattle as ResBattle_1 } from './debug/PtlBattle';
import { ReqPvp, ResPvp } from './debug/PtlPvp';
import { ReqSave, ResSave } from './debug/PtlSave';
import { ReqTakeOffEquip, ResTakeOffEquip } from './debug/PtlTakeOffEquip';
import { ReqUpequip, ResUpequip } from './debug/PtlUpequip';
import { MsgAction } from './MsgAction';
import { ReqList, ResList } from './player/bag/PtlList';
import { ReqLook, ResLook } from './player/bag/PtlLook';
import { ReqSell_sys, ResSell_sys } from './player/bag/PtlSell_sys';
import { ReqUse, ResUse } from './player/bag/PtlUse';
import { ReqList as ReqList_1, ResList as ResList_1 } from './player/equip/PtlList';
import { ReqLook as ReqLook_1, ResLook as ResLook_1 } from './player/equip/PtlLook';
import { ReqReName, ResReName } from './player/equip/PtlReName';
import { ReqStrengthen, ResStrengthen } from './player/equip/PtlStrengthen';
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
import { ReqUpLeve, ResUpLeve } from './player/skill/PtlUpLeve';
import { ReqList as ReqList_3, ResList as ResList_3 } from './player/task/PtlList';
import { ReqLook as ReqLook_3, ResLook as ResLook_3 } from './player/task/PtlLook';
import { ReqMiss, ResMiss } from './PtlMiss';
import { ReqPing, ResPing } from './PtlPing';
import { ReqBuy, ResBuy } from './shop/equip/PtlBuy';
import { ReqLook as ReqLook_4, ResLook as ResLook_4 } from './shop/equip/PtlLook';
import { ReqBuy as ReqBuy_1, ResBuy as ResBuy_1 } from './shop/skill/PtlBuy';
import { ReqLook as ReqLook_5, ResLook as ResLook_5 } from './shop/skill/PtlLook';
import { ReqCancel, ResCancel } from './transaction/PtlCancel';
import { ReqConfirm, ResConfirm } from './transaction/PtlConfirm';
import { ReqBuild, ResBuild } from './work/PtlBuild';

export interface ServiceType {
    api: {
        "active/Create_equip": {
            req: ReqCreate_equip,
            res: ResCreate_equip
        },
        "active/Create_skill": {
            req: ReqCreate_skill,
            res: ResCreate_skill
        },
        "active/Sign": {
            req: ReqSign,
            res: ResSign
        },
        "backend/skill/Del": {
            req: ReqDel,
            res: ResDel
        },
        "backend/skill/Edit": {
            req: ReqEdit,
            res: ResEdit
        },
        "backend/skill/Effect_list": {
            req: ReqEffect_list,
            res: ResEffect_list
        },
        "backend/skill/Query_eff": {
            req: ReqQuery_eff,
            res: ResQuery_eff
        },
        "backend/skill/Query": {
            req: ReqQuery,
            res: ResQuery
        },
        "backend/skill/Skill_list": {
            req: ReqSkill_list,
            res: ResSkill_list
        },
        "battle/Battle": {
            req: ReqBattle,
            res: ResBattle
        },
        "battle/Out": {
            req: ReqOut,
            res: ResOut
        },
        "common/GetBodySysCfg": {
            req: ReqGetBodySysCfg,
            res: ResGetBodySysCfg
        },
        "common/SetUp": {
            req: ReqSetUp,
            res: ResSetUp
        },
        "debug/bag/Skill": {
            req: ReqSkill,
            res: ResSkill
        },
        "debug/Battle": {
            req: ReqBattle_1,
            res: ResBattle_1
        },
        "debug/Pvp": {
            req: ReqPvp,
            res: ResPvp
        },
        "debug/Save": {
            req: ReqSave,
            res: ResSave
        },
        "debug/TakeOffEquip": {
            req: ReqTakeOffEquip,
            res: ResTakeOffEquip
        },
        "debug/Upequip": {
            req: ReqUpequip,
            res: ResUpequip
        },
        "player/bag/List": {
            req: ReqList,
            res: ResList
        },
        "player/bag/Look": {
            req: ReqLook,
            res: ResLook
        },
        "player/bag/Sell_sys": {
            req: ReqSell_sys,
            res: ResSell_sys
        },
        "player/bag/Use": {
            req: ReqUse,
            res: ResUse
        },
        "player/equip/List": {
            req: ReqList_1,
            res: ResList_1
        },
        "player/equip/Look": {
            req: ReqLook_1,
            res: ResLook_1
        },
        "player/equip/ReName": {
            req: ReqReName,
            res: ResReName
        },
        "player/equip/Strengthen": {
            req: ReqStrengthen,
            res: ResStrengthen
        },
        "player/equip/TakeOff": {
            req: ReqTakeOff,
            res: ResTakeOff
        },
        "player/info/GetBase": {
            req: ReqGetBase,
            res: ResGetBase
        },
        "player/info/Position": {
            req: ReqPosition,
            res: ResPosition
        },
        "player/info/SetName": {
            req: ReqSetName,
            res: ResSetName
        },
        "player/inherit/Info": {
            req: ReqInfo,
            res: ResInfo
        },
        "player/inherit/Reset": {
            req: ReqReset,
            res: ResReset
        },
        "player/map/Out": {
            req: ReqOut_1,
            res: ResOut_1
        },
        "player/map/Search": {
            req: ReqSearch,
            res: ResSearch
        },
        "player/map/Start": {
            req: ReqStart,
            res: ResStart
        },
        "player/skill/List": {
            req: ReqList_2,
            res: ResList_2
        },
        "player/skill/Look": {
            req: ReqLook_2,
            res: ResLook_2
        },
        "player/skill/Rename": {
            req: ReqRename,
            res: ResRename
        },
        "player/skill/Rm": {
            req: ReqRm,
            res: ResRm
        },
        "player/skill/UpLeve": {
            req: ReqUpLeve,
            res: ResUpLeve
        },
        "player/task/List": {
            req: ReqList_3,
            res: ResList_3
        },
        "player/task/Look": {
            req: ReqLook_3,
            res: ResLook_3
        },
        "Miss": {
            req: ReqMiss,
            res: ResMiss
        },
        "Ping": {
            req: ReqPing,
            res: ResPing
        },
        "shop/equip/Buy": {
            req: ReqBuy,
            res: ResBuy
        },
        "shop/equip/Look": {
            req: ReqLook_4,
            res: ResLook_4
        },
        "shop/skill/Buy": {
            req: ReqBuy_1,
            res: ResBuy_1
        },
        "shop/skill/Look": {
            req: ReqLook_5,
            res: ResLook_5
        },
        "transaction/Cancel": {
            req: ReqCancel,
            res: ResCancel
        },
        "transaction/Confirm": {
            req: ReqConfirm,
            res: ResConfirm
        },
        "work/Build": {
            req: ReqBuild,
            res: ResBuild
        }
    },
    msg: {
        "Action": MsgAction
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 21,
    "services": [
        {
            "id": 51,
            "name": "active/Create_equip",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 47,
            "name": "active/Create_skill",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 0,
            "name": "active/Sign",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 40,
            "name": "backend/skill/Del",
            "type": "api",
            "conf": {
                "check_onlyid": false
            }
        },
        {
            "id": 41,
            "name": "backend/skill/Edit",
            "type": "api",
            "conf": {
                "check_onlyid": false
            }
        },
        {
            "id": 42,
            "name": "backend/skill/Effect_list",
            "type": "api",
            "conf": {
                "check_onlyid": false
            }
        },
        {
            "id": 43,
            "name": "backend/skill/Query_eff",
            "type": "api",
            "conf": {
                "check_onlyid": false
            }
        },
        {
            "id": 44,
            "name": "backend/skill/Query",
            "type": "api",
            "conf": {
                "check_onlyid": false
            }
        },
        {
            "id": 45,
            "name": "backend/skill/Skill_list",
            "type": "api",
            "conf": {
                "check_onlyid": false
            }
        },
        {
            "id": 1,
            "name": "battle/Battle",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 2,
            "name": "battle/Out",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 3,
            "name": "common/GetBodySysCfg",
            "type": "api",
            "conf": {
                "check_onlyid": false
            }
        },
        {
            "id": 4,
            "name": "common/SetUp",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 5,
            "name": "debug/bag/Skill",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 6,
            "name": "debug/Battle",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 7,
            "name": "debug/Pvp",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 8,
            "name": "debug/Save",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 9,
            "name": "debug/TakeOffEquip",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 10,
            "name": "debug/Upequip",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 11,
            "name": "Action",
            "type": "msg",
            "conf": {}
        },
        {
            "id": 12,
            "name": "player/bag/List",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 13,
            "name": "player/bag/Look",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 14,
            "name": "player/bag/Sell_sys",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 15,
            "name": "player/bag/Use",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 16,
            "name": "player/equip/List",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 17,
            "name": "player/equip/Look",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 18,
            "name": "player/equip/ReName",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 19,
            "name": "player/equip/Strengthen",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 20,
            "name": "player/equip/TakeOff",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 21,
            "name": "player/info/GetBase",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 22,
            "name": "player/info/Position",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 23,
            "name": "player/info/SetName",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 24,
            "name": "player/inherit/Info",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 25,
            "name": "player/inherit/Reset",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 26,
            "name": "player/map/Out",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 27,
            "name": "player/map/Search",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 28,
            "name": "player/map/Start",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 29,
            "name": "player/skill/List",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 30,
            "name": "player/skill/Look",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 31,
            "name": "player/skill/Rename",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 32,
            "name": "player/skill/Rm",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 33,
            "name": "player/skill/UpLeve",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 48,
            "name": "player/task/List",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 34,
            "name": "player/task/Look",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 35,
            "name": "Miss",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 36,
            "name": "Ping",
            "type": "api",
            "conf": {
                "check_onlyid": false
            }
        },
        {
            "id": 52,
            "name": "shop/equip/Buy",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 53,
            "name": "shop/equip/Look",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 49,
            "name": "shop/skill/Buy",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 50,
            "name": "shop/skill/Look",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 37,
            "name": "transaction/Cancel",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 38,
            "name": "transaction/Confirm",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 39,
            "name": "work/Build",
            "type": "api",
            "conf": {
                "check_onlyid": false
            }
        }
    ],
    "types": {
        "active/PtlCreate_equip/ReqCreate_equip": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "cont",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "../protocols/master_base/BaseRequest": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "_player",
                    "type": {
                        "type": "Any"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "_onlyid",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "_messageid",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "_platform",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "active/PtlCreate_equip/ResCreate_equip": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "../protocols/master_base/BaseResponse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "sys",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "active/PtlCreate_skill/ReqCreate_skill": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 4,
                    "name": "cont",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "active/PtlCreate_skill/ResCreate_skill": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "active/PtlSign/ReqSign": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "active/PtlSign/ResSign": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "consecutive_sign_count",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "sign_count",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "todayRank",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "gitfs",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Any"
                        }
                    }
                }
            ]
        },
        "backend/skill/PtlDel/ReqDel": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "Any"
                    }
                }
            ]
        },
        "backend/skill/PtlDel/ResDel": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "backend/skill/PtlEdit/ReqEdit": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "data",
                    "type": {
                        "type": "Any"
                    }
                }
            ]
        },
        "backend/skill/PtlEdit/ResEdit": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "backend/skill/PtlEffect_list/ReqEffect_list": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "backend/skill/PtlEffect_list/ResEffect_list": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Any"
                        }
                    }
                }
            ]
        },
        "backend/skill/PtlQuery_eff/ReqQuery_eff": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "backend/skill/PtlQuery_eff/ResQuery_eff": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "data",
                    "type": {
                        "type": "Any"
                    }
                }
            ]
        },
        "backend/skill/PtlQuery/ReqQuery": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "backend/skill/PtlQuery/ResQuery": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "backend/skill/PtlSkill_list/ReqSkill_list": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "backend/skill/PtlSkill_list/ResSkill_list": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Any"
                        }
                    }
                }
            ]
        },
        "battle/PtlBattle/ReqBattle": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "battle/PtlBattle/ResBattle": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "battle/PtlOut/ReqOut": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "battle/PtlOut/ResOut": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "common/PtlGetBodySysCfg/ReqGetBodySysCfg": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "key",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "common/PtlGetBodySysCfg/ResGetBodySysCfg": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "cfg",
                    "type": {
                        "type": "Any"
                    }
                }
            ]
        },
        "common/PtlSetUp/ReqSetUp": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "key",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "value",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        },
        "common/PtlSetUp/ResSetUp": {
            "type": "Interface",
            "extends": [
                {
                    "id": 1,
                    "type": {
                        "type": "Reference",
                        "target": "shareFace/_user_cfg"
                    }
                }
            ]
        },
        "shareFace/_user_cfg": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "img",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        },
        "debug/bag/PtlSkill/ReqSkill": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "debug/bag/PtlSkill/ResSkill": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "debug/PtlBattle/ReqBattle": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "debug/PtlBattle/ResBattle": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "data",
                    "type": {
                        "type": "Reference",
                        "target": "MsgAction/MSG_BATTLELOG"
                    }
                }
            ]
        },
        "MsgAction/MSG_BATTLELOG": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "title",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "tips",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "round",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "skLog",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Any"
                        }
                    }
                },
                {
                    "id": 4,
                    "name": "dataLog",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Any"
                        }
                    }
                },
                {
                    "id": 5,
                    "name": "killLog",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Any"
                        }
                    }
                },
                {
                    "id": 6,
                    "name": "gitfs",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Any"
                        }
                    }
                }
            ]
        },
        "debug/PtlPvp/ReqPvp": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "debug/PtlPvp/ResPvp": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "debug/PtlSave/ReqSave": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "debug/PtlSave/ResSave": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "debug/PtlTakeOffEquip/ReqTakeOffEquip": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "debug/PtlTakeOffEquip/ResTakeOffEquip": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "debug/PtlUpequip/ReqUpequip": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "debug/PtlUpequip/ResUpequip": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "MsgAction/MsgAction": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/base/BaseMessage"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "template",
                    "type": {
                        "type": "Reference",
                        "target": "MsgAction/template"
                    }
                },
                {
                    "id": 1,
                    "name": "messageId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "data",
                    "type": {
                        "type": "Any"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "delaytime",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "../protocols/base/BaseMessage": {
            "type": "Interface"
        },
        "MsgAction/template": {
            "type": "Enum",
            "members": [
                {
                    "id": 0,
                    "value": "未注册"
                },
                {
                    "id": 1,
                    "value": "测试"
                },
                {
                    "id": 2,
                    "value": "战斗日志"
                },
                {
                    "id": 3,
                    "value": "文本消息"
                },
                {
                    "id": 4,
                    "value": "交易/创建"
                },
                {
                    "id": 5,
                    "value": "纯文字"
                },
                {
                    "id": 6,
                    "value": "离线奖励"
                }
            ]
        },
        "player/bag/PtlList/ReqList": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "filter",
                    "type": {
                        "type": "Reference",
                        "target": "shareFace/Item_Type"
                    },
                    "optional": true
                }
            ]
        },
        "shareFace/Item_Type": {
            "type": "Enum",
            "members": [
                {
                    "id": 0,
                    "value": 0
                },
                {
                    "id": 1,
                    "value": 1
                },
                {
                    "id": 2,
                    "value": 2
                },
                {
                    "id": 3,
                    "value": 3
                }
            ]
        },
        "player/bag/PtlList/ResList": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 1,
                    "name": "filter",
                    "type": {
                        "type": "Reference",
                        "target": "shareFace/Item_Type"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "gold",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "name",
                                    "type": {
                                        "type": "String"
                                    }
                                },
                                {
                                    "id": 1,
                                    "name": "cont",
                                    "type": {
                                        "type": "Number"
                                    }
                                },
                                {
                                    "id": 2,
                                    "name": "idx",
                                    "type": {
                                        "type": "Number"
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        },
        "player/bag/PtlLook/ReqLook": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "idx",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "player/bag/PtlLook/ResLook": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "type",
                    "type": {
                        "type": "Reference",
                        "target": "shareFace/Item_Type"
                    }
                },
                {
                    "id": 1,
                    "name": "temp",
                    "type": {
                        "type": "Any"
                    }
                }
            ]
        },
        "player/bag/PtlSell_sys/ReqSell_sys": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "idx",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "cont",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "player/bag/PtlSell_sys/ResSell_sys": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "player/bag/PtlUse/ReqUse": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "idx",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "cont",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "player/bag/PtlUse/ResUse": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "player/equip/PtlList/ReqList": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "player/equip/PtlList/ResList": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Union",
                            "members": [
                                {
                                    "id": 0,
                                    "type": {
                                        "type": "Interface",
                                        "properties": [
                                            {
                                                "id": 0,
                                                "name": "name",
                                                "type": {
                                                    "type": "String"
                                                }
                                            },
                                            {
                                                "id": 1,
                                                "name": "type",
                                                "type": {
                                                    "type": "String"
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "id": 1,
                                    "type": {
                                        "type": "Literal"
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        },
        "player/equip/PtlLook/ReqLook": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "idx",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "player/equip/PtlLook/ResLook": {
            "type": "Interface",
            "extends": [
                {
                    "id": 1,
                    "type": {
                        "type": "Reference",
                        "target": "shareFace/prop_item_equip"
                    }
                }
            ]
        },
        "shareFace/prop_item_equip": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "att",
                    "type": {
                        "type": "Any"
                    }
                },
                {
                    "id": 2,
                    "name": "sys",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 5,
                    "name": "type",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "leve_strengthen",
                    "type": {
                        "type": "Reference",
                        "target": "shareFace/_bar"
                    }
                },
                {
                    "id": 6,
                    "name": "desc",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 8,
                    "name": "quality",
                    "type": {
                        "type": "Reference",
                        "target": "face_master/quality"
                    }
                },
                {
                    "id": 7,
                    "name": "from",
                    "type": {
                        "type": "Any"
                    }
                }
            ]
        },
        "shareFace/_bar": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "shareFace/_base_com"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "name",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "key",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "max",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "now",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "shareFace/_base_com": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "t",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "face_master/quality": {
            "type": "Enum",
            "members": [
                {
                    "id": 0,
                    "value": 1
                },
                {
                    "id": 1,
                    "value": 2
                },
                {
                    "id": 2,
                    "value": 3
                },
                {
                    "id": 3,
                    "value": 4
                },
                {
                    "id": 4,
                    "value": 5
                },
                {
                    "id": 5,
                    "value": 6
                },
                {
                    "id": 6,
                    "value": 7
                },
                {
                    "id": 7,
                    "value": 8
                },
                {
                    "id": 8,
                    "value": 9
                },
                {
                    "id": 9,
                    "value": 10
                },
                {
                    "id": 10,
                    "value": 11
                },
                {
                    "id": 11,
                    "value": 12
                },
                {
                    "id": 12,
                    "value": 13
                },
                {
                    "id": 13,
                    "value": 14
                },
                {
                    "id": 14,
                    "value": 15
                },
                {
                    "id": 15,
                    "value": 16
                },
                {
                    "id": 16,
                    "value": 17
                },
                {
                    "id": 17,
                    "value": 18
                },
                {
                    "id": 18,
                    "value": 19
                },
                {
                    "id": 19,
                    "value": 20
                },
                {
                    "id": 20,
                    "value": 21
                },
                {
                    "id": 21,
                    "value": 22
                },
                {
                    "id": 22,
                    "value": 23
                },
                {
                    "id": 23,
                    "value": 24
                },
                {
                    "id": 24,
                    "value": 25
                },
                {
                    "id": 25,
                    "value": 26
                },
                {
                    "id": 26,
                    "value": 27
                },
                {
                    "id": 27,
                    "value": 28
                },
                {
                    "id": 28,
                    "value": 29
                },
                {
                    "id": 29,
                    "value": 30
                }
            ]
        },
        "player/equip/PtlReName/ReqReName": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "idx",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "player/equip/PtlReName/ResReName": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "player/equip/PtlStrengthen/ReqStrengthen": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "idx",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "from",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "player/equip/PtlStrengthen/ResStrengthen": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "player/equip/PtlTakeOff/ReqTakeOff": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "idx",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "player/equip/PtlTakeOff/ResTakeOff": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "player/info/PtlGetBase/ReqGetBase": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "player/info/PtlGetBase/ResGetBase": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "sys",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 6,
                    "name": "fight",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 5,
                    "name": "leve",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "inherit",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "className",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "att",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Any"
                        }
                    }
                }
            ]
        },
        "player/info/PtlPosition/ReqPosition": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "player/info/PtlPosition/ResPosition": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "online",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "player/info/PtlSetName/ReqSetName": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "new",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "player/info/PtlSetName/ResSetName": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "player/inherit/PtlInfo/ReqInfo": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "player/inherit/PtlInfo/ResInfo": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 5,
                    "name": "quality",
                    "type": {
                        "type": "Reference",
                        "target": "face_master/quality"
                    }
                },
                {
                    "id": 1,
                    "name": "from",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "sys",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "att",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Any"
                        }
                    }
                },
                {
                    "id": 6,
                    "name": "max",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Any"
                        }
                    }
                }
            ]
        },
        "player/inherit/PtlReset/ReqReset": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "player/inherit/PtlReset/ResReset": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "player/map/PtlOut/ReqOut": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "player/map/PtlOut/ResOut": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "player/map/PtlSearch/ReqSearch": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "player/map/PtlSearch/ResSearch": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "type",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Literal",
                                    "literal": "monster"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Literal",
                                    "literal": "player"
                                }
                            },
                            {
                                "id": 2,
                                "type": {
                                    "type": "Literal",
                                    "literal": "reward"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 1,
                    "name": "data",
                    "type": {
                        "type": "Any"
                    }
                }
            ]
        },
        "player/map/PtlStart/ReqStart": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "name",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "String"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Literal"
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "player/map/PtlStart/ResStart": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "player/skill/PtlList/ReqList": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "player/skill/PtlList/ResList": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "name",
                                    "type": {
                                        "type": "String"
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        },
        "player/skill/PtlLook/ReqLook": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "idx",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "player/skill/PtlLook/ResLook": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "shareFace/prop_item_skill"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "shareFace/prop_item_skill": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "cd",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "type",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "desc",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "leve",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 5,
                    "name": "leve_exp",
                    "type": {
                        "type": "Reference",
                        "target": "shareFace/_bar"
                    }
                }
            ]
        },
        "player/skill/PtlRename/ReqRename": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "idx",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "rename",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "player/skill/PtlRename/ResRename": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "player/skill/PtlRm/ReqRm": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "idx",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "player/skill/PtlRm/ResRm": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "player/skill/PtlUpLeve/ReqUpLeve": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "idx",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "player/skill/PtlUpLeve/ResUpLeve": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "player/task/PtlList/ReqList": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "player/task/PtlList/ResList": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                }
            ]
        },
        "player/task/PtlLook/ReqLook": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "player/task/PtlLook/ResLook": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "shareFace/taskData"
                    }
                }
            ]
        },
        "shareFace/taskData": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "desc",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "condition",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 3,
                                    "name": "desc",
                                    "type": {
                                        "type": "String"
                                    }
                                },
                                {
                                    "id": 0,
                                    "name": "type",
                                    "type": {
                                        "type": "String"
                                    }
                                },
                                {
                                    "id": 1,
                                    "name": "target",
                                    "type": {
                                        "type": "Any"
                                    }
                                },
                                {
                                    "id": 2,
                                    "name": "progress",
                                    "type": {
                                        "type": "Number"
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "id": 3,
                    "name": "isComplete",
                    "type": {
                        "type": "Boolean"
                    }
                },
                {
                    "id": 4,
                    "name": "isReward",
                    "type": {
                        "type": "Boolean"
                    }
                },
                {
                    "id": 5,
                    "name": "reward",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "shareFace/prop_item"
                        }
                    }
                },
                {
                    "id": 6,
                    "name": "endtime",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 7,
                    "name": "del",
                    "type": {
                        "type": "Boolean"
                    },
                    "optional": true
                }
            ]
        },
        "shareFace/prop_item": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "type",
                    "type": {
                        "type": "Reference",
                        "target": "shareFace/Item_Type"
                    }
                },
                {
                    "id": 2,
                    "name": "icon",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "cont",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 4,
                    "name": "data",
                    "type": {
                        "type": "Any"
                    },
                    "optional": true
                }
            ]
        },
        "PtlMiss/ReqMiss": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "PtlMiss/ResMiss": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "PtlPing/ReqPing": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "PtlPing/ResPing": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "shop/equip/PtlBuy/ReqBuy": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "shop/equip/PtlBuy/ResBuy": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "shop/equip/PtlLook/ReqLook": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "shop/equip/PtlLook/ResLook": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "data",
                    "type": {
                        "type": "Reference",
                        "target": "shareFace/prop_item_equip"
                    }
                },
                {
                    "id": 1,
                    "name": "stock",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "price",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "name",
                                "type": {
                                    "type": "String"
                                }
                            },
                            {
                                "id": 1,
                                "name": "cont",
                                "type": {
                                    "type": "Number"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 3,
                    "name": "down_time",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "shop/skill/PtlBuy/ReqBuy": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "shop/skill/PtlBuy/ResBuy": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "shop/skill/PtlLook/ReqLook": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "shop/skill/PtlLook/ResLook": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "data",
                    "type": {
                        "type": "Reference",
                        "target": "shareFace/prop_item_skill"
                    }
                },
                {
                    "id": 1,
                    "name": "stock",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "price",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "name",
                                "type": {
                                    "type": "String"
                                }
                            },
                            {
                                "id": 1,
                                "name": "cont",
                                "type": {
                                    "type": "Number"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 3,
                    "name": "down_time",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "transaction/PtlCancel/ReqCancel": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "transaction/PtlCancel/ResCancel": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "transaction/PtlConfirm/ReqConfirm": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "transaction/PtlConfirm/ResConfirm": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        },
        "work/PtlBuild/ReqBuild": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseRequest"
                    }
                }
            ]
        },
        "work/PtlBuild/ResBuild": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/master_base/BaseResponse"
                    }
                }
            ]
        }
    }
};