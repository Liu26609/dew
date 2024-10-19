import { WsClient } from "tsrpc";
import master from ".";
import { ServiceType } from "../shared/master/serviceProto";
import user from "./manage/user";
import db from "../model/db/db";
import { player } from "./lib/unity/player";
import { template } from "../shared/master/MsgAction";
// import { template } from "../shared/master/MsgAction";
class logic {
    stop: boolean = false;
    constructor() {

    }
    pushFlow() {
        master.push_preApiCallFlow(async (call) => {
            // 1.检测请求方是否已经注册

            let check_onlyid = call.service.conf.check_onlyid
            if (check_onlyid) {
                let user_id = call.req._onlyid;
                let fromid = call.req._fromid;
                // 服务器停止,更新
                if (this.stop) {
                    debugger;
                    // (call.conn as WsClient<ServiceType>).sendMsg('Action', {
                    //     template: template.default_none,
                    //     tolocation: fromid,
                    //     data: '⚠️服务器暂时关闭,具体关闭原因请查看Q群550620904'
                    // });
                    return;
                }
                let onlyid = `${call.req._platform}_${user_id}`
                let onLine = user.locaHas(onlyid);
                let _user: any;
                if(!onLine){
                    _user = await user.sqHas(onlyid)
                }else{
                    _user = onLine;
                }

                if (!_user) {
                    _user = user.create(onlyid);
                    (call.conn as WsClient<ServiceType>).sendMsg('Action', {
                        template: template.未注册,
                        messageId: call.req._messageid,
                    });
                    call.error("用户不存在")
                    return undefined;
                }
                _user.set_conn(call.conn,call.req._messageid);
                // if (typeof (call.sn) == 'number') {
                //     user.setConn(call.conn);
                //     user.setLastLocation(fromid)
                // }
                // if (check_team && !user.get_team()) {
                //     user.sendMsg(template.default, '此功能需加入小队后才能使用');
                //     call.error("权限不足")
                //     return;
                // }
                // if (check_notBattle && user.get_battle()) {
                //     user.sendMsg(template.default, '此功能需[离开]战斗才能使用，战斗可不能分心哦~');
                //     call.error("权限不足")
                //     return;
                // }
                // if (check_npc) {
                //     let _cell = user.getPosition();
                //     if (!_cell.haveNpc(check_npc)) {
                //         user.sendMsg(template.default, '此功能需要在指定NPC位置才能使用哦~');
                //         call.error("需要在指定NPC位置")
                //         return;
                //     }
                // }
                // if (!onLine) {
                //     user.onLine();
                // }
                call.req._player = _user;
                _user.active();
            }
            return call;
        }, master.s_wss, master.s_http)
    }
}
export default new logic();