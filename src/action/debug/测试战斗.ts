import server from "../../server"
import message from "../../trigger/message"

export default class {
    constructor(cls: message) {
        this.start(cls)
    }
    async start(cls: message) {
        let req = await server.api('debug/Battle', {}, cls)
        console.log('战斗日志', req.skLog)
        let temp = `╞════🔵我方统计═━┄\n`
        let A = req.skLog[0]
        for (const userName in A) {
            let line = `🐍${userName}`
            const element = A[userName];
            for (const skName in element) {
                line + `│▌${skName}`
                let effArry = element[skName];
                for (let i = 0; i < effArry.length; i++) {
                    const effItem = effArry[i];
                    line += `🗡${effItem.val}`;
                }
            }
            temp += line + '\n'
        }
        temp += `╞════🔵敌方统计═━┄\n`
        A = req.skLog[1]
        for (const userName in A) {
            let line = `🐍${userName}`
            const element = A[userName];
            for (const skName in element) {
                line += `│▌${skName}`
                let effArry = element[skName];
                for (let i = 0; i < effArry.length; i++) {
                    const effItem = effArry[i];
                    line += `🗡${effItem.val}`;
                }
            }
            temp += line + '\n'
        }
        // 战斗数据
        let dataLog_A = req.dataLog[0]
        let dataLog_all = '';
        let moreLog = ''
        temp += `╞════🔵战斗数据═━┄\n`
        let data_line = ''
        for (const key in dataLog_A) {
            const data = dataLog_A[key];
            let val = 0;
            for (const name in data) {
                val += data[name];
                if(data_line.length<=0){
                    data_line += `🐍${name}`
                }
                data_line += `│▌${key}:${data[name]}`;
            }
            moreLog += `${data_line}\n`;
            dataLog_all += `│▌总${key}:${val}`;
        }
        temp += dataLog_all + '\n';
        temp += moreLog;
        temp += `本次战斗共计${req.round}回合\n`
        temp += `╞════🔵击杀统计═━┄\n`
        let killLog = req.killLog;
        for (let index = 0; index < killLog.length; index++) {
            const element = killLog[index];
            temp += `${element.round}->🐍${element.use}击杀🐍${element.tag}\n`
        }
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