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
import { ReqList as ReqList_1, ResList as ResList_1 } from './player/equip/PtlList';
import { ReqLook, ResLook } from './player/equip/PtlLook';
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
import { ReqLook as ReqLook_1, ResLook as ResLook_1 } from './player/skill/PtlLook';
import { ReqRename, ResRename } from './player/skill/PtlRename';
import { ReqRm, ResRm } from './player/skill/PtlRm';
import { ReqMiss, ResMiss } from './PtlMiss';
import { ReqPing, ResPing } from './PtlPing';
import { ReqBuild, ResBuild } from './work/PtlBuild';

export interface ServiceType {
    api: {
        "active/Sign": {
            req: ReqSign,
            res: ResSign
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
        "player/equip/List": {
            req: ReqList_1,
            res: ResList_1
        },
        "player/equip/Look": {
            req: ReqLook,
            res: ResLook
        },
        "player/equip/ReName": {
            req: ReqReName,
            res: ResReName
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
            req: ReqLook_1,
            res: ResLook_1
        },
        "player/skill/Rename": {
            req: ReqRename,
            res: ResRename
        },
        "player/skill/Rm": {
            req: ReqRm,
            res: ResRm
        },
        "Miss": {
            req: ReqMiss,
            res: ResMiss
        },
        "Ping": {
            req: ReqPing,
            res: ResPing
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
    "version": 24,
    "services": [
        {
            "id": 7,
            "name": "active/Sign",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 14,
            "name": "battle/Battle",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 8,
            "name": "battle/Out",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 18,
            "name": "common/GetBodySysCfg",
            "type": "api",
            "conf": {
                "check_onlyid": false
            }
        },
        {
            "id": 15,
            "name": "debug/bag/Skill",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 3,
            "name": "debug/Battle",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 9,
            "name": "debug/Pvp",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 10,
            "name": "debug/Save",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 30,
            "name": "debug/TakeOffEquip",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 29,
            "name": "debug/Upequip",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 4,
            "name": "Action",
            "type": "msg",
            "conf": {}
        },
        {
            "id": 24,
            "name": "player/bag/List",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 31,
            "name": "player/equip/List",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 32,
            "name": "player/equip/Look",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 33,
            "name": "player/equip/ReName",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 34,
            "name": "player/equip/TakeOff",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 11,
            "name": "player/info/GetBase",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 13,
            "name": "player/info/Position",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 5,
            "name": "player/info/SetName",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 19,
            "name": "player/inherit/Info",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 22,
            "name": "player/inherit/Reset",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 23,
            "name": "player/map/Out",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 16,
            "name": "player/map/Search",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 17,
            "name": "player/map/Start",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 25,
            "name": "player/skill/List",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 26,
            "name": "player/skill/Look",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 27,
            "name": "player/skill/Rename",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 28,
            "name": "player/skill/Rm",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 6,
            "name": "Miss",
            "type": "api",
            "conf": {
                "check_onlyid": true
            }
        },
        {
            "id": 0,
            "name": "Ping",
            "type": "api",
            "conf": {
                "check_onlyid": false
            }
        },
        {
            "id": 2,
            "name": "work/Build",
            "type": "api",
            "conf": {
                "check_onlyid": false
            }
        }
    ],
    "types": {
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
                    "id": 4,
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
                    "id": 6,
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
                    "id": 4,
                    "value": "战斗日志"
                },
                {
                    "id": 3,
                    "value": "文本消息"
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
                                }
                            ]
                        }
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
                    "id": 2,
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
                    "id": 3,
                    "name": "sys",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "inherit",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "className",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
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
                },
                {
                    "id": 2,
                    "name": "pgs",
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
                    "id": 3,
                    "name": "skills",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
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
                    "id": 2,
                    "name": "cd",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "type",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "desc",
                    "type": {
                        "type": "String"
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