"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceProto = void 0;
exports.serviceProto = {
    "version": 3,
    "services": [
        {
            "id": 0,
            "name": "CompressImg",
            "type": "api",
            "conf": {}
        },
        {
            "id": 1,
            "name": "Ping",
            "type": "api",
            "conf": {}
        }
    ],
    "types": {
        "PtlCompressImg/ReqCompressImg": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/tool_base/BaseRequest"
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
                },
                {
                    "id": 1,
                    "name": "quality",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "../protocols/tool_base/BaseRequest": {
            "type": "Interface"
        },
        "PtlCompressImg/ResCompressImg": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/tool_base/BaseResponse"
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
        "../protocols/tool_base/BaseResponse": {
            "type": "Interface"
        },
        "PtlPing/ReqPing": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../protocols/tool_base/BaseRequest"
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
                        "target": "../protocols/tool_base/BaseResponse"
                    }
                }
            ]
        }
    }
};
