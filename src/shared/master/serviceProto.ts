import { ServiceProto } from 'tsrpc-proto';
import { ReqSign, ResSign } from './active/PtlSign';
import { ReqBattle, ResBattle } from './battle/PtlBattle';
import { ReqOut, ResOut } from './battle/PtlOut';
import { ReqSearch, ResSearch } from './battle/PtlSearch';
import { ReqBattle as ReqBattle_1, ResBattle as ResBattle_1 } from './debug/PtlBattle';
import { ReqPvp, ResPvp } from './debug/PtlPvp';
import { ReqSave, ResSave } from './debug/PtlSave';
import { MsgAction } from './MsgAction';
import { ReqGetBase, ResGetBase } from './player/info/PtlGetBase';
import { ReqPosition, ResPosition } from './player/info/PtlPosition';
import { ReqSetName, ResSetName } from './player/info/PtlSetName';
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
        "battle/Search": {
            req: ReqSearch,
            res: ResSearch
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
    "version": 8,
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
            "id": 12,
            "name": "battle/Search",
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
            "id": 4,
            "name": "Action",
            "type": "msg",
            "conf": {}
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
                }
            ]
        },
        "../protocols/master_base/BaseResponse": {
            "type": "Interface"
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
        "battle/PtlSearch/ReqSearch": {
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
        "battle/PtlSearch/ResSearch": {
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
                        "target": "../interface/MSG_BATTLELOG"
                    }
                }
            ]
        },
        "../interface/MSG_BATTLELOG": {
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