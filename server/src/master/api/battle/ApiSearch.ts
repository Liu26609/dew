import { ApiCall } from "tsrpc";
import { ReqSearch, ResSearch } from "../../../shared/master/battle/PtlSearch";
/**
 * 1.随机匹配怪物
 * 2.随机匹配玩家
 * 3.随机获得奖励
 * @param call 
 */
export default async function (call: ApiCall<ReqSearch, ResSearch>) {
   
    call.succ({});
}