import { ServiceProto } from 'tsrpc-proto';
import { ReqBattle, ResBattle } from './debug/PtlBattle';
import { MsgAction } from './MsgAction';
import { ReqGetBase, ResGetBase } from './player/info/PtlGetBase';
import { ReqSetName, ResSetName } from './player/info/PtlSetName';
import { ReqMiss, ResMiss } from './PtlMiss';
import { ReqPing, ResPing } from './PtlPing';
import { ReqBuild, ResBuild } from './work/PtlBuild';

export interface ServiceType {
    api: {
        "debug/Battle": {
            req: ReqBattle,
            res: ResBattle
        },
        "player/info/GetBase": {
            req: ReqGetBase,
            res: ResGetBase
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
    "version": 6,
    "services": [
        {
            "id": 3,
            "name": "debug/Battle",
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
            "id": 7,
            "name": "player/info/GetBase",
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
                    "id": 2,
                    "name": "round",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "skLog",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Any"
                        }
                    }
                },
                {
                    "id": 3,
                    "name": "dataLog",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Any"
                        }
                    }
                },
                {
                    "id": 4,
                    "name": "killLog",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "tag",
                                    "type": {
                                        "type": "String"
                                    }
                                },
                                {
                                    "id": 1,
                                    "name": "round",
                                    "type": {
                                        "type": "Number"
                                    }
                                },
                                {
                                    "id": 2,
                                    "name": "use",
                                    "type": {
                                        "type": "String"
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "id": 5,
                    "name": "gitfs",
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
        "../protocols/master_base/BaseResponse": {
            "type": "Interface"
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