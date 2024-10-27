import server from "../../../server";
import { temp_card } from "../../../temp/temp_text";
import message from "../../../trigger/message";



export default class {
    constructor(cls: message) {
        this.init(cls);
    }

    async init(cls: message) {
        let res = await server.api('player/map/Search', {}, cls)
        console.log(res)
        if(!res)return;
        switch (res.type) {
            case 'monster':
                // 发现怪物
                this.search_monster(cls, res.data)
                break;
            default:
                break;
        }
    }
    search_monster(cls: message, data: any) {
        let temp = new temp_card();
        temp.set_title('发现敌人', '⚔️')
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            temp.add(`🟥${element.name}`)
        }
        temp.set_title_line('选择行动', '🔍')
        temp.add(`【战斗】         【探索】`)
        cls.send_v2(temp)
    }
}
