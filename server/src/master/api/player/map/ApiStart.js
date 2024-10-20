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
exports.default = default_1;
function default_1(call) {
    return __awaiter(this, void 0, void 0, function* () {
        let p = call.req._player;
        let map = p.getMap();
        if (map.name != '主神空间') {
            call.error('你已经在地图中,请先完成或退出地图');
            return;
        }
        /**
         * 1.根据玩家战力匹配出符合实力的地图
         * 修改mapid
         * 提示已经成功进入世界
         */
        // xlsxToJson.cfg.get('map_测试地图')
        p.set_mapid('测试地图');
        call.succ({});
    });
}
