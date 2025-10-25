import { ServiceProto } from 'tsrpc-proto';
import { MsgMessage } from './MsgMessage';
import { ReqMessage, ResMessage } from './PtlMessage';

export interface ServiceType {
    api: {
        "Message": {
            req: ReqMessage,
            res: ResMessage
        }
    },
    msg: {
        "Message": MsgMessage
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 5,
    "services": [
        {
            "id": 2,
            "name": "Message",
            "type": "msg"
        },
        {
            "id": 1,
            "name": "Message",
            "type": "api",
            "conf": {
                "openApi": false
            }
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
                        "target": "../face/index/IMessage"
                    }
                }
            ]
        },
        "../face/index/IMessage": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "handleType",
                    "type": {
                        "type": "Reference",
                        "target": "../face/index/MessageHandleType"
                    }
                },
                {
                    "id": 0,
                    "name": "line",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../face/index/IMessageItem"
                        }
                    }
                }
            ]
        },
        "../face/index/MessageHandleType": {
            "type": "Enum",
            "members": [
                {
                    "id": 0,
                    "value": "text"
                },
                {
                    "id": 1,
                    "value": "image"
                }
            ]
        },
        "../face/index/IMessageItem": {
            "type": "Union",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../face/index/ITitleMessage"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Reference",
                        "target": "../face/index/ILineMessage"
                    }
                },
                {
                    "id": 2,
                    "type": {
                        "type": "Reference",
                        "target": "../face/index/IClassMessage"
                    }
                },
                {
                    "id": 3,
                    "type": {
                        "type": "Reference",
                        "target": "../face/index/IImageMessage"
                    }
                }
            ]
        },
        "../face/index/ITitleMessage": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "type",
                    "type": {
                        "type": "Literal",
                        "literal": 0
                    }
                },
                {
                    "id": 1,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "../face/index/MessageType": {
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
        "../face/index/ILineMessage": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "type",
                    "type": {
                        "type": "Literal",
                        "literal": 1
                    }
                },
                {
                    "id": 1,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "../face/index/IClassMessage": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "type",
                    "type": {
                        "type": "Literal",
                        "literal": 2
                    }
                },
                {
                    "id": 1,
                    "name": "className",
                    "type": {
                        "type": "Reference",
                        "target": "../face/index/MessageClassName"
                    }
                },
                {
                    "id": 2,
                    "name": "content",
                    "type": {
                        "type": "Any"
                    }
                }
            ]
        },
        "../face/index/MessageClassName": {
            "type": "Enum",
            "members": [
                {
                    "id": 0,
                    "value": 0
                }
            ]
        },
        "../face/index/IImageMessage": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "type",
                    "type": {
                        "type": "Literal",
                        "literal": 3
                    }
                },
                {
                    "id": 1,
                    "name": "renderType",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
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
                        "target": "protocols/base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "bot",
                    "type": {
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
                            }
                        ]
                    }
                },
                {
                    "id": 1,
                    "name": "user",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "id",
                                "type": {
                                    "type": "String"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 2,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "protocols/base/BaseRequest": {
            "type": "Interface"
        },
        "PtlMessage/ResMessage": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "protocols/base/BaseResponse"
                    }
                }
            ]
        },
        "protocols/base/BaseResponse": {
            "type": "Interface"
        }
    }
};