import message from '../../trigger/message';
import { MSG_BATTLELOG, MsgAction } from '../../shared/master/MsgAction';
import battleText from '../../temp/battleText';
import { temp_card } from '../../temp/temp_text';
import APP from '../../APP';
import { CFG } from '../..';
export default class {
    constructor(cls: message, data: MsgAction) {
        console.log('回合战斗', data)
        this.start(cls, data)
    }
    async start(cls: message, data: MsgAction) {
        let req = data.data as MSG_BATTLELOG;
        let temp = new temp_card()
        temp.set_title(req.title, '⚔️')
        let getlink = this.render_gitText(req)
        temp.line(`🔗${getlink}`)
        // temp.set_title_line('己方战报', '🟩')
        // temp.add(battleText.getSkLog(req.skLog[0]))
        // temp.set_title_line('敌方战报', '🟥')
        temp.add(battleText.getSkLog(req.skLog[1]))
        // 战斗数据
        temp.set_title_line('战斗数据', '🔥')
        temp.add(battleText.getData(req.dataLog[0]))
        temp.add(`🕢战斗共计${req.round}回合`)
        // temp.set_title_line('击杀统计', '💀')
        // temp.add(battleText.getKillLog(req.killLog));

        temp.add(`${req.tips}`)
        if (req.gitfs.length > 0) {
            let gifts = req.gitfs;
            temp.add(battleText.getGiftLog(gifts))
        }
        
        cls.send_v2(temp)
    }
    render_gitText(req: MSG_BATTLELOG) {
        let postlink = `https://gitee.com/api/v5/repos/cxd30/bot-ui/contents/battle_log/${Date.now()}.md`;
        // let postlink = `https://gitee.com/api/v5/repos/ChuXuanD30/dew-bot/contents/battle_log/${Date.now()}.md`;
        // let getlink = `https://gitee.com/ChuXuanD30/bot-ui/blob/master/battle_log/${Date.now()}.md`
        let getlink = `https://gitee.com/cxd30/bot-ui/blob/master/battle_log/${Date.now()}.md`
        let content = ''
        // 己方战报
        content += `<div align="center">\n\n## 📜己方战报\n\n</div>\n`
        content += `${battleText.getSkLog_md(req.skLog[0])}\n\n`

        // 敌方战报
        content += `<div align="center">\n\n## 📜敌方战报\n\n</div>\n`
        content += `${battleText.getSkLog_md(req.skLog[1])}\n\n`

        // 战斗数据
        content += `<div align="center">\n\n## 🔥🔥战斗数据🔥🔥\n\n</div>\n`
        content += `${battleText.getData_md(req.dataLog[0])}\n`
        content += `🕢战斗共计<a href="https://qm.qq.com/q/VEua3umPus">${req.round}</a>回合\n\n`
        // 击杀统计
        content += `<div align="center">\n\n## 💀💀击杀统计💀💀\n\n</div>\n`
        let killLog = req.killLog;
        if (killLog.length == 0) {
            return ''
        }
        for (let index = 0; index < killLog.length; index++) {
            const element = killLog[index];
            content += `🕢${element.round}回合<a href="https://qm.qq.com/q/VEua3umPus">${element.use}</a>🗡️击杀了 <a href="https://qm.qq.com/q/VEua3umPus">${element.tag}</a>\n\n`
            // 如果index不是最后一个
            if (index != killLog.length - 1) {
                content += '\n'
            }
        }
        // Base64编码内容
        const base64Content = Buffer.from(content).toString('base64');
         APP.ctx.http.post(
                postlink,
                {
                    access_token:CFG.git密钥,
                    content: base64Content,
                    message: `战斗日志: ${req.title} - ${new Date().toLocaleString()}`
                },
                {
                    responseType: 'json'
            }
        ).then(res => {
            console.log('战斗日志上报成功');
        }).catch(err => {
            console.log('战斗日志上报失败');
        })
        return getlink
    }
}