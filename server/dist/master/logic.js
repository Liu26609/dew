"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const user_1 = __importDefault(require("./manage/user"));
const MsgAction_1 = require("../shared/master/MsgAction");
// import { template } from "../shared/master/MsgAction";
class logic {
    constructor() {
        this.stop = false;
    }
    pushFlow() {
        _1.default.push_preApiCallFlow((call) => __awaiter(this, void 0, void 0, function* () {
            // 1.检测请求方是否已经注册
            let check_onlyid = call.service.conf.check_onlyid;
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
                let onlyid = `${call.req._platform}_${user_id}`;
                let onLine = user_1.default.locaHas(onlyid);
                let _user;
                if (!onLine) {
                    _user = yield user_1.default.sqHas(onlyid);
                }
                else {
                    _user = onLine;
                }
                if (!_user) {
                    _user = user_1.default.create(onlyid);
                    call.conn.sendMsg('Action', {
                        template: MsgAction_1.template.未注册,
                        messageId: call.req._messageid,
                    });
                    call.error("用户不存在");
                    return undefined;
                }
                _user.set_conn(call.conn, call.req._messageid);
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
                if (!onLine) {
                    _user.onLine();
                }
                else {
                    _user.active();
                }
                call.req._player = _user;
                _user.active();
            }
            return call;
        }), _1.default.s_wss, _1.default.s_http);
    }
}
exports.default = new logic();
