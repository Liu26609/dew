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
const bags_1 = require("../../../lib/unity/base/bags");
const PtlFace_1 = require("../../../../shared/PtlFace");
const MsgAction_1 = require("../../../../shared/master/MsgAction");
function default_1(call) {
    return __awaiter(this, void 0, void 0, function* () {
        let p = call.req._player;
        let bag = p.bag;
        let idx = call.req.idx - 1;
        let cont = call.req.cont;
        let item = bag.get_item(bags_1.bag_getType.index, idx);
        if (!item) {
            call.error('背包中没有ID为' + idx + '的物品');
            return;
        }
        let sellCont = item.cont >= cont ? cont : item.cont;
        // 假设道具价值100
        let coin = 100 * sellCont;
        let sellCoin = coin * cont;
        p.addItem({ name: '金币', cont: sellCoin, type: PtlFace_1.Item_Type.道具 });
        p.sendMessageg('Action', {
            template: MsgAction_1.template.文本消息,
            data: `[出售成功]你已将${item.name}X${sellCont}出售至主神空间，获得${sellCoin}金币`,
            messageId: '',
            delaytime: 1
        });
        call.succ({});
    });
}
exports.default = default_1;
