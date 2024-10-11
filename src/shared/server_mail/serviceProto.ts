import { ServiceProto } from 'tsrpc-proto';
import { ReqCheck, ResCheck } from './PtlCheck';
import { ReqPull, ResPull } from './PtlPull';
import { ReqSend, ResSend } from './PtlSend';

export interface ServiceType {
    api: {
        "Check": {
            req: ReqCheck,
            res: ResCheck
        },
        "Pull": {
            req: ReqPull,
            res: ResPull
        },
        "Send": {
            req: ReqSend,
            res: ResSend
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 3,
    "services": [
        {
            "id": 0,
            "name": "Check",
            "type": "api",
            "conf": {}
        },
        {
            "id": 1,
            "name": "Pull",
            "type": "api",
            "conf": {}
        },
        {
            "id": 2,
            "name": "Send",
            "type": "api",
            "conf": {}
        }
    ],
    "types": {
        "PtlCheck/ReqCheck": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/server_mail_base/BaseRequest"
                    }
                }
            ]
        },
        "../protocols/server_mail_base/BaseRequest": {
            "type": "Interface"
        },
        "PtlCheck/ResCheck": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/server_mail_base/BaseResponse"
                    }
                }
            ]
        },
        "../protocols/server_mail_base/BaseResponse": {
            "type": "Interface"
        },
        "PtlPull/ReqPull": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/server_mail_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "uuid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "dev",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "PtlPull/ResPull": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/server_mail_base/BaseResponse"
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
                            "type": "Reference",
                            "target": "../interface/mail_item"
                        }
                    }
                },
                {
                    "id": 1,
                    "name": "dev",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "../interface/mail_item": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "create",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "from",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "uuid",
                                "type": {
                                    "type": "String"
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
                    }
                },
                {
                    "id": 2,
                    "name": "to",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "uuid",
                                "type": {
                                    "type": "String"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 3,
                    "name": "title",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 5,
                    "name": "annexs",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../interface/face_prop_item"
                        }
                    }
                }
            ]
        },
        "../interface/face_prop_item": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "uuid",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "min_type",
                    "type": {
                        "type": "Reference",
                        "target": "../interface/prop_min_type"
                    }
                },
                {
                    "id": 2,
                    "name": "score",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "from",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "num",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 5,
                    "name": "data",
                    "type": {
                        "type": "Any"
                    }
                },
                {
                    "id": 6,
                    "name": "icon",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "../interface/prop_min_type": {
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
                },
                {
                    "id": 4,
                    "value": 4
                },
                {
                    "id": 5,
                    "value": 5
                }
            ]
        },
        "PtlSend/ReqSend": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/server_mail_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "data",
                    "type": {
                        "type": "Reference",
                        "target": "../interface/mail_item"
                    }
                }
            ]
        },
        "PtlSend/ResSend": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/server_mail_base/BaseResponse"
                    }
                }
            ]
        }
    }
};