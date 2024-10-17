import { BaseRequest, BaseResponse, BaseConf } from "../../protocols/master_base";
export interface ReqBattle extends BaseRequest {
}
export interface ResBattle extends BaseResponse {
    round: number;
    skLog: any[];
    dataLog: any[];
    killLog: {
        tag: string;
        round: number;
        use: string;
    }[];
    gitfs: {
        name: string;
        cont: number;
    }[];
}
export declare const conf: BaseConf;
