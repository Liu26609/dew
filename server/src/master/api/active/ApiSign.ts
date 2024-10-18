import { ApiCall } from "tsrpc";
import { ReqSign, ResSign } from "../../../shared/master/active/PtlSign";
import sign from "../../manage/sign";
/**
 * 1.凌晨刷新签到时间
 * 2.累计签到天数
 * 3.连续签到奖励
 * 4.今日签到排名
 */
export default async function (call: ApiCall<ReqSign, ResSign>) {
    // TODO
    let cls =  await sign.sign(call.req._player.id);
    if(!cls){
        call.error('今日已经签到过了');
        return;
    }
    // 签到成功
    console.log(`
/**
 * 1.共计签到${cls.consecutive_sign_count}天
 * 2.累计签到${cls.sign_count}天
 * 4.今日签到排名${cls.todayRank}
 */`)
    call.succ({});
}