import { ApiCall } from "tsrpc";
import { ReqStart, ResStart } from "../../../../shared/master/player/map/PtlStart";
import { player } from "../../../lib/unity/player";
import xlsxToJson from "../../../../model/xlsxToJson";

export default async function (call: ApiCall<ReqStart, ResStart>) {
    let p = call.req._player as player;
    let map = p.getMap();
    if(map.name != '主神空间'){
        call.error('你已经在地图中,请先完成或退出地图')
        return;
    }

    /**
     * 1.根据玩家战力匹配出符合实力的地图
     * 修改mapid
     * 提示已经成功进入世界
     */
    // xlsxToJson.cfg.get('map_测试地图')
    p.set_mapid('测试地图');

    call.succ({})
}