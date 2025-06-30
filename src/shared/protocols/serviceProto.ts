import { ServiceProto } from 'tsrpc-proto';
import { ReqChangeBodyShow, ResChangeBodyShow } from './client/body/PtlChangeBodyShow';
import { ReqCheck, ResCheck } from './client/PtlCheck';
import { ReqGetTempKey, ResGetTempKey } from './client/PtlGetTempKey';
import { ReqLogin, ResLogin } from './client/PtlLogin';
import { ReqUploadImg, ResUploadImg } from './client/PtlUploadImg';
import { MsgMessage } from './MsgMessage';
import { ReqCompressImg, ResCompressImg } from './open/PtlCompressImg';
import { ReqMessage, ResMessage } from './PtlMessage';
import { ReqTest, ResTest } from './test/PtlTest';

export interface ServiceType {
    api: {
        "client/body/ChangeBodyShow": {
            req: ReqChangeBodyShow,
            res: ResChangeBodyShow
        },
        "client/Check": {
            req: ReqCheck,
            res: ResCheck
        },
        "client/GetTempKey": {
            req: ReqGetTempKey,
            res: ResGetTempKey
        },
        "client/Login": {
            req: ReqLogin,
            res: ResLogin
        },
        "client/UploadImg": {
            req: ReqUploadImg,
            res: ResUploadImg
        },
        "open/CompressImg": {
            req: ReqCompressImg,
            res: ResCompressImg
        },
        "Message": {
            req: ReqMessage,
            res: ResMessage
        },
        "test/Test": {
            req: ReqTest,
            res: ResTest
        }
    },
    msg: {
        "Message": MsgMessage
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 12,
    "services": [
        {
            "id": 9,
            "name": "client/body/ChangeBodyShow",
            "type": "api",
            "conf": {}
        },
        {
            "id": 7,
            "name": "client/Check",
            "type": "api",
            "conf": {
                "_notLoadPlayer": true
            }
        },
        {
            "id": 10,
            "name": "client/GetTempKey",
            "type": "api",
            "conf": {}
        },
        {
            "id": 8,
            "name": "client/Login",
            "type": "api",
            "conf": {
                "_notLoadPlayer": true
            }
        },
        {
            "id": 11,
            "name": "client/UploadImg",
            "type": "api",
            "conf": {}
        },
        {
            "id": 5,
            "name": "Message",
            "type": "msg",
            "conf": {}
        },
        {
            "id": 6,
            "name": "open/CompressImg",
            "type": "api",
            "conf": {}
        },
        {
            "id": 4,
            "name": "Message",
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
        "client/body/PtlChangeBodyShow/ReqChangeBodyShow": {
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
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "base/BaseRequest": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "_token",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "_player",
                    "type": {
                        "type": "Any"
                    },
                    "optional": true
                }
            ]
        },
        "client/body/PtlChangeBodyShow/ResChangeBodyShow": {
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
        "client/PtlCheck/ReqCheck": {
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
        "client/PtlCheck/ResCheck": {
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
                    "name": "judge",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        },
        "client/PtlGetTempKey/ReqGetTempKey": {
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
        "client/PtlGetTempKey/ResGetTempKey": {
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
                    "name": "TmpSecretId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "TmpSecretKey",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "SecurityToken",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "StartTime",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 4,
                    "name": "ExpiredTime",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "client/PtlLogin/ReqLogin": {
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
                    "name": "account",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "client/PtlLogin/ResLogin": {
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
                    "name": "token",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "client/PtlUploadImg/ReqUploadImg": {
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
                    "name": "imgBuf",
                    "type": {
                        "type": "Buffer",
                        "arrayType": "Uint8Array"
                    }
                }
            ]
        },
        "client/PtlUploadImg/ResUploadImg": {
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
                    "name": "imgUrl",
                    "type": {
                        "type": "String"
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
                    "id": 4,
                    "name": "userId",
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
        "open/PtlCompressImg/ReqCompressImg": {
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
                    "name": "imgBuf",
                    "type": {
                        "type": "Buffer",
                        "arrayType": "Uint8Array"
                    }
                }
            ]
        },
        "open/PtlCompressImg/ResCompressImg": {
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
                    "name": "imgBuf",
                    "type": {
                        "type": "Buffer",
                        "arrayType": "Uint8Array"
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