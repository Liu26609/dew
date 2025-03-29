import { ServiceProto } from 'tsrpc-proto';
import { MsgChat } from './MsgChat';
import { MsgMessage } from './MsgMessage';
import { ReqMessage, ResMessage } from './PtlMessage';
import { ReqSend, ResSend } from './PtlSend';
import { ReqCreate, ResCreate } from './test/PtlCreate';
import { ReqTest, ResTest } from './test/PtlTest';

export interface ServiceType {
    api: {
        "Message": {
            req: ReqMessage,
            res: ResMessage
        },
        "Send": {
            req: ReqSend,
            res: ResSend
        },
        "test/Create": {
            req: ReqCreate,
            res: ResCreate
        },
        "test/Test": {
            req: ReqTest,
            res: ResTest
        }
    },
    msg: {
        "Chat": MsgChat,
        "Message": MsgMessage
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 4,
    "services": [
        {
            "id": 0,
            "name": "Chat",
            "type": "msg"
        },
        {
            "id": 5,
            "name": "Message",
            "type": "msg",
            "conf": {}
        },
        {
            "id": 4,
            "name": "Message",
            "type": "api",
            "conf": {}
        },
        {
            "id": 1,
            "name": "Send",
            "type": "api"
        },
        {
            "id": 2,
            "name": "test/Create",
            "type": "api",
            "conf": {}
        },
        {
            "id": 3,
            "name": "test/Test",
            "type": "api",
            "conf": {}
        }
    ],
    "types": {
        "MsgChat/MsgChat": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
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
                        "target": "../face/IMassage/ClientAction"
                    }
                },
                {
                    "id": 1,
                    "name": "Message",
                    "type": {
                        "type": "Reference",
                        "target": "../face/IMassage/Message"
                    }
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
                }
            ]
        },
        "base/BaseMessage": {
            "type": "Interface"
        },
        "../face/IMassage/ClientAction": {
            "type": "Enum",
            "members": [
                {
                    "id": 3,
                    "value": "none"
                },
                {
                    "id": 4,
                    "value": "image"
                },
                {
                    "id": 5,
                    "value": "text"
                }
            ]
        },
        "../face/IMassage/Message": {
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
                    "name": "private",
                    "type": {
                        "type": "Boolean"
                    }
                },
                {
                    "id": 2,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
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
                        "target": "../face/IMassage/UserInfo"
                    }
                },
                {
                    "id": 1,
                    "name": "ClientInfo",
                    "type": {
                        "type": "Reference",
                        "target": "../face/IMassage/ClientInfo"
                    }
                },
                {
                    "id": 2,
                    "name": "Message",
                    "type": {
                        "type": "Reference",
                        "target": "../face/IMassage/Message"
                    }
                }
            ]
        },
        "base/BaseRequest": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "_user",
                    "type": {
                        "type": "Any"
                    },
                    "optional": true
                }
            ]
        },
        "../face/IMassage/UserInfo": {
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
        "../face/IMassage/ClientInfo": {
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
            "type": "Interface"
        },
        "PtlSend/ReqSend": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlSend/ResSend": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "test/PtlCreate/ReqCreate": {
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
                    "name": "info",
                    "type": {
                        "type": "Reference",
                        "target": "../face/IBody/platformInfo"
                    }
                }
            ]
        },
        "../face/IBody/platformInfo": {
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
                    }
                }
            ]
        },
        "test/PtlCreate/ResCreate": {
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
        },
        "test/PtlTest/ReqTest": {
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
        "test/PtlTest/ResTest": {
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