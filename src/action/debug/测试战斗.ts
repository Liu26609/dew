import server from "../../server"
import message from "../../trigger/message"

export default class {
    constructor(cls: message) {
        this.start(cls)
    }
    async start(cls: message) {
        let req = await server.api('debug/Battle', {}, cls)
        console.log('战斗日志', req.log)
        let temp = `╞════🔵我方统计═━┄\n`
        let A = req.log[0]
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
        A = req.log[0]
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
        // temp += `╞════🔵战斗数据═━┄\n`
        /**
         * 本次战斗共计100回合
         * 总伤害155总治疗544总召唤548次
         */
        // temp += `╞════🔵击杀统计═━┄\n`
        /**
         * 11->xxx击杀xxx
         * 22->xxx击杀xxx
         */
        // temp += `╞════🔵战斗收获═━┄\n`
        /**
         * 经验值+1000
         */
        console.log(temp)

        cls.addLine(temp)
        cls.send()
    }
}