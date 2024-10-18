import { ServiceProto } from 'tsrpc-proto';
import { ReqLook, ResLook } from './PtlLook';
import { ReqUpdate, ResUpdate } from './PtlUpdate';

export interface ServiceType {
    api: {
        "Look": {
            req: ReqLook,
            res: ResLook
        },
        "Update": {
            req: ReqUpdate,
            res: ResUpdate
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 7,
    "services": [
        {
            "id": 0,
            "name": "Look",
            "type": "api",
            "conf": {}
        },
        {
            "id": 1,
            "name": "Update",
            "type": "api",
            "conf": {}
        }
    ],
    "types": {
        "PtlLook/ReqLook": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/server_rank_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "type",
                    "type": {
                        "type": "Reference",
                        "target": "../interface/rank_type"
                    }
                },
                {
                    "id": 1,
                    "name": "uuid",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "../protocols/server_rank_base/BaseRequest": {
            "type": "Interface"
        },
        "../interface/rank_type": {
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
                },
                {
                    "id": 6,
                    "value": 6
                },
                {
                    "id": 7,
                    "value": 7
                },
                {
                    "id": 8,
                    "value": 8
                },
                {
                    "id": 9,
                    "value": 9
                },
                {
                    "id": 10,
                    "value": 10
                },
                {
                    "id": 11,
                    "value": 11
                },
                {
                    "id": 12,
                    "value": 12
                },
                {
                    "id": 13,
                    "value": 13
                },
                {
                    "id": 14,
                    "value": 14
                },
                {
                    "id": 15,
                    "value": 15
                },
                {
                    "id": 16,
                    "value": 16
                },
                {
                    "id": 17,
                    "value": 17
                },
                {
                    "id": 18,
                    "value": 18
                },
                {
                    "id": 19,
                    "value": 19
                },
                {
                    "id": 20,
                    "value": 20
                },
                {
                    "id": 21,
                    "value": 21
                },
                {
                    "id": 22,
                    "value": 22
                },
                {
                    "id": 23,
                    "value": 23
                },
                {
                    "id": 24,
                    "value": 24
                },
                {
                    "id": 25,
                    "value": 25
                },
                {
                    "id": 26,
                    "value": 26
                },
                {
                    "id": 27,
                    "value": 27
                }
            ]
        },
        "PtlLook/ResLook": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/server_rank_base/BaseResponse"
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
                            "target": "../interface/rank_item"
                        }
                    }
                },
                {
                    "id": 1,
                    "name": "query_rank",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "../protocols/server_rank_base/BaseResponse": {
            "type": "Interface"
        },
        "../interface/rank_item": {
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
                },
                {
                    "id": 2,
                    "name": "type",
                    "type": {
                        "type": "Reference",
                        "target": "../interface/rank_type"
                    }
                },
                {
                    "id": 3,
                    "name": "num",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 4,
                    "name": "style",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 5,
                    "name": "title_style",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlUpdate/ReqUpdate": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/server_rank_base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "data",
                    "type": {
                        "type": "Reference",
                        "target": "../interface/rank_item"
                    }
                }
            ]
        },
        "PtlUpdate/ResUpdate": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/server_rank_base/BaseResponse"
                    }
                }
            ]
        }
    }
};