import battleText from "../../lib/battleText"
import server from "../../server"
import { MSG_BATTLELOG } from "../../shared/interface"
import message from "../../trigger/message"

export default class {
    constructor(cls: message) {
        this.start(cls)
    }
    async start(cls: message) {
        let data = await server.api('debug/Battle', {}, cls)
        let req = data.data as MSG_BATTLELOG;
        console.log('战斗日志', req.skLog)
        let temp = `┏┄═══🔵${req.title}═━┄\n`
        temp += `${req.tips}\n`
         temp += `╞════🔵我方统计═━┄\n`
        temp += battleText.getSkLog(req.skLog[0])
        temp += `╞════🔵敌方统计═━┄\n`
        temp += battleText.getSkLog(req.skLog[1])


        temp += battleText.getData(req.dataLog[0]);
        temp += `战斗共计${req.round}回合\n`
        temp += `╞════🔵击杀统计═━┄\n`
        temp += battleText.getKillLog(req.killLog);
        /**
         * 11->xxx击杀xxx
         * 22->xxx击杀xxx
         */
        temp += `╞════🔵战斗收获═━┄\n`
        let gifts = req.gitfs;
        for (let index = 0; index < gifts.length; index++) {
            const element = gifts[index];
            temp += `🎁${element.name}x${element.cont}\n`
        }
        console.log(temp)

        cls.addLine(temp)
        cls.send()
    }
}