import server from "../../../server";
import { temp_card } from "../../../temp/temp_text";
import message from "../../../trigger/message"



export default class {
    constructor(cls: message) {
        this.init(cls);
    }

    async init(cls: message) {
        let req = await server.api('player/info/Position', {}, cls)
        if (!req) return;
        let temp = new temp_card();
        switch (req.name) {
            case '主神空间':
                temp.set_title('主神空间', '🌌')
                temp.line(`世界玩家:${req.online}`)
                break;

            default:
                temp.set_title('我的位置', '🌍')
                temp.line(`当前世界:${req.name}`)
                temp.line(`世界玩家:${req.online}`)
                temp.line(`探索进度:${req.pgs}%`)
                break;
        }
        cls.send_v2(temp)
    }
}