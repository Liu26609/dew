import server from "../../server";
import message from "../../trigger/message";



export default class {
    constructor(cls: message) {
        this.init(cls);
    }

    async init(cls: message) {
        let req = await server.api('active/Sign', {}, cls)
        if (!req) return;
        let temp = `╞════🔵签到成功═━┄\n`
        temp += `共计签到${req.consecutive_sign_count}天\n`
        temp += `累计签到${req.sign_count}\n`
        temp += `今日排名${req.todayRank}\n`
        cls.addLine(temp)
        cls.send()
    }
}