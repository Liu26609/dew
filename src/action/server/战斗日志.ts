import message from '../../trigger/message';
import { MSG_BATTLELOG, MsgAction } from '../../shared/master/MsgAction';
import battleText from '../../temp/battleText';
export default class {
    constructor(cls: message, data: MsgAction) {
        console.log('回合战斗', data)
        this.start(cls, data)
    }
    async start(cls: message, data: MsgAction) {
        let req = data.data as MSG_BATTLELOG;

        let temp = `┏┄═══🔵${req.title}═━┄\n`
         temp += `${req.tips}\n`
        temp += `╞════🔵我方统计═━┄\n`
        temp += battleText.getSkLog(req.skLog[0])
        temp += `╞════🔵敌方统计═━┄\n`
        temp += battleText.getSkLog(req.skLog[1])


        // 战斗数据
        temp += battleText.getData(req.dataLog[0]);
        temp += `战斗共计${req.round}回合\n`
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