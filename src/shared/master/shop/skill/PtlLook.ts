import { BaseRequest, BaseResponse, BaseConf } from "../../../protocols/master_base";
import { prop_item_skill } from "../../shareFace";

/**
 * 技能商店
 */
export interface ReqLook extends BaseRequest {
    
}

export interface ResLook extends BaseResponse {
    // 当前出售的技能
    data: prop_item_skill;
    // 剩余库存
    stock: number;
    // 价格信息
    price: {
        name: string;
        cont: number;
    };
    // 刷新倒计时
    down_time: number;
}

export const conf: BaseConf = {
    check_onlyid: true
}