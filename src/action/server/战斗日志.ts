import message from '../../trigger/message';
import { MSG_BATTLELOG, MsgAction } from '../../shared/master/MsgAction';
import battleText from '../../temp/battleText';
import { temp_card } from '../../temp/temp_text';
export default class {
    constructor(cls: message, data: MsgAction) {
        console.log('回合战斗', data)
        this.start(cls, data)
    }
    async start(cls: message, data: MsgAction) {
        let req = data.data as MSG_BATTLELOG;
        let temp = new temp_card()
        temp.set_title(req.title, '⚔️')
        temp.line(req.tips)
        temp.set_title_line('己方战报','🟩')
        temp.add(battleText.getSkLog(req.skLog[0]))
        temp.set_title_line('敌方战报','🟥')
        temp.add(battleText.getSkLog(req.skLog[1]))
        // 战斗数据
        temp.set_title_line('战斗数据','🔥')
        temp.add(battleText.getData(req.dataLog[0]))
        temp.add(`🕢战斗共计${req.round}回合`)
        temp.set_title_line('击杀统计','💀')
        temp.add(battleText.getKillLog(req.killLog));

        temp.set_title_line('战利品🎁','🎁')
   
        let gifts = req.gitfs;
        for (let index = 0; index < gifts.length; index++) {
            const element = gifts[index];
            temp.add(`🎁${element.name}x${element.cont}`)
        }
        cls.send_v2(temp)
    }
}