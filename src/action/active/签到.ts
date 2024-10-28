import server from "../../server";
import { temp_card } from "../../temp/temp_text";
import message from "../../trigger/message";



export default class {
    constructor(cls: message) {
        this.init(cls);
    }

    async init(cls: message) {
        let req = await server.api('active/Sign', {}, cls)
        if (!req) return;
        let temp = new temp_card()
        temp.set_title('签到成功','✨️')
        temp.add(`🎰共计签到${req.consecutive_sign_count}天`)
        temp.add(`🎐累计签到${req.sign_count}天`)
        temp.add(`🏆️今日排名${req.todayRank}`)
        temp.set_title_line('签到奖励','🎁')

        let gifts = req.gitfs;
        for (let index = 0; index < gifts.length; index++) {
            const element = gifts[index];
            temp.add(`🎁${element.name}x${element.cont}`)
        }
        cls.send_v2(temp)
    }
}