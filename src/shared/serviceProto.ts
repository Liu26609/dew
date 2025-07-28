import { ServiceProto } from 'tsrpc-proto';
import { MsgMessage } from './MsgMessage';
import { ReqMessage, ResMessage } from './PtlMessage';
import { ReqSys, ResSys } from './PtlSys';
import { ReqTest, ResTest } from './PtlTest';

export interface ServiceType {
    api: {
        "Message": {
            req: ReqMessage,
            res: ResMessage
        },
        "Sys": {
            req: ReqSys,
            res: ResSys
        },
        "Test": {
            req: ReqTest,
            res: ResTest
        }
    },
    msg: {
        "Message": MsgMessage
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 6,
    "services": [
        {
            "id": 2,
            "name": "Message",
            "type": "msg",
            "conf": {}
        },
        {
            "id": 0,
            "name": "Message",
            "type": "api",
            "conf": {}
        },
        {
            "id": 3,
            "name": "Sys",
            "type": "api",
            "conf": {}
        },
        {
            "id": 1,
            "name": "Test",
            "type": "api",
            "conf": {}
        }
    ],
    "types": {
        "MsgMessage/MsgMessage": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseMessage"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "action",
                    "type": {
                        "type": "Reference",
                        "target": "IMassage/ClientAction"
                    }
                },
                {
                    "id": 1,
                    "name": "Message",
                    "type": {
                        "type": "Reference",
                        "target": "IMassage/Message"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "info",
                    "type": {
                        "type": "Any"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "data",
                    "type": {
                        "type": "Any"
                    },
                    "optional": true
                },
                {
                    "id": 4,
                    "name": "_player",
                    "type": {
                        "type": "Any"
                    },
                    "optional": true
                }
            ]
        },
        "base/BaseMessage": {
            "type": "Interface"
        },
        "IMassage/ClientAction": {
            "type": "Enum",
            "members": [
                {
                    "id": 0,
                    "value": "none"
                },
                {
                    "id": 1,
                    "value": "image"
                },
                {
                    "id": 2,
                    "value": "text"
                }
            ]
        },
        "IMassage/Message": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "msgId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "userId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "private",
                    "type": {
                        "type": "Boolean"
                    }
                },
                {
                    "id": 3,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "guildId",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "PtlMessage/ReqMessage": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "UserInfo",
                    "type": {
                        "type": "Reference",
                        "target": "IMassage/UserInfo"
                    }
                },
                {
                    "id": 1,
                    "name": "ClientInfo",
                    "type": {
                        "type": "Reference",
                        "target": "IMassage/ClientInfo"
                    }
                },
                {
                    "id": 2,
                    "name": "Message",
                    "type": {
                        "type": "Reference",
                        "target": "IMassage/Message"
                    }
                }
            ]
        },
        "base/BaseRequest": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "_token",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "_player",
                    "type": {
                        "type": "Any"
                    },
                    "optional": true
                }
            ]
        },
        "IMassage/UserInfo": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "name",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "avatar",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "isBot",
                    "type": {
                        "type": "Boolean"
                    },
                    "optional": true
                }
            ]
        },
        "IMassage/ClientInfo": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "platform",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "avatar",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "PtlMessage/ResMessage": {
            "type": "Interface",
            "extends": [
                {
                    "id": 1,
                    "type": {
                        "type": "Reference",
                        "target": "MsgMessage/MsgMessage"
                    }
                },
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "base/BaseResponse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "_token",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "PtlSys/ReqSys": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "PtlSys/ResSys": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "version",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "PtlTest/ReqTest": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "PtlTest/ResTest": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        }
    }
};