import { ServiceProto } from 'tsrpc-proto';
import { ReqCompressImg, ResCompressImg } from './PtlCompressImg';
import { ReqPing, ResPing } from './PtlPing';

export interface ServiceType {
    api: {
        "CompressImg": {
            req: ReqCompressImg,
            res: ResCompressImg
        },
        "Ping": {
            req: ReqPing,
            res: ResPing
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 4,
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
        "PtlCompressImg/ResCompressImg": {
            "type": "Interface",
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
        "../protocols/tool_base/BaseRequest": {
            "type": "Interface"
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
        },
        "../protocols/tool_base/BaseResponse": {
            "type": "Interface"
        }
    }
};