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
Object.defineProperty(exports, "__esModule", { value: true });
const MsgAction_1 = require("../../../../shared/master/MsgAction");
const PtlFace_1 = require("../../../../shared/PtlFace");
/**
 * 1.随机匹配怪物
 * 2.随机匹配玩家
 * 3.随机获得奖励
 * @param call
 */
function default_1(call) {
    return __awaiter(this, void 0, void 0, function* () {
        let p = call.req._player;
        let map = p.getMap();
        if (map.name == '主神空间') {
            // 你还没有进入任何世界,你可以:
            // $at输入[开始历练]进入与你实力匹配的世界
            // $at输入曾进入过的世界名
            let text = `你还没有进入任何世界,你可以:
$at输入[历练]进入与你实力匹配的世界
$at输入[历练 + 世界名]进入指定世界`;
            p.sendMessageg('Action', {
                template: MsgAction_1.template.文本消息,
                messageId: '',
                data: text
            });
            call.error('没有进入任何世界');
            return;
        }
        let res = map.search(p);
        let resData = [];
        let ls = {
            game_over: (b) => {
                console.log('探索战斗结束');
                let log = b.get_log(p.get_group());
                let gitfs = b.getGift(p.id);
                let data = {
                    title: "战斗结束",
                    tips: `探索战斗结束`,
                    round: b.round,
                    skLog: log.skLog,
                    dataLog: log.dataLog,
                    killLog: log.killLog,
                    gitfs: gitfs,
                };
                p.addItem(gitfs);
                p.sendMessageg('Action', {
                    template: MsgAction_1.template.战斗日志,
                    data: data,
                    messageId: ""
                });
            },
            // 监听谁击杀了谁
            log_kill: (b, win, die) => {
                if (win.id == p.id) {
                    let killLeve = die.leve.getVal();
                    b.addGift(win.id, { name: '金币', cont: 1, type: PtlFace_1.Item_Type.道具 });
                    b.addGift(win.id, { name: '经验', cont: killLeve, type: PtlFace_1.Item_Type.道具 });
                    b.addGift(win.id, { name: '测试道具', cont: 999, type: PtlFace_1.Item_Type.道具 });
                }
            }
        };
        p.set_battleLs(ls);
        switch (res.type) {
            case 'monster':
                for (let i = 0; i < res.data.length; i++) {
                    const element = res.data[i];
                    resData.push({
                        name: element.name,
                    });
                }
                break;
            default:
                break;
        }
        call.succ({
            type: 'monster',
            data: res.data.map(v => { return { name: v.name }; })
        });
    });
}
exports.default = default_1;
