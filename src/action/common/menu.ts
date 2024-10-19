import message from "../../trigger/message"

export default class {
    constructor(cls:message){
        cls.addLine('┏┄══✉️基础指令══━┄')
        cls.addLine('┃ [探索]查看当前进行的活动')
        cls.addLine('┃ [位置]查看当前位置')
        cls.addLine('┃ [战斗]超多任务等你参与')
        cls.addLine('┃════✉️提示系统═━┄')
        cls.addLine('┃ Tips[指令 + hp]可查看指令的描述')
        cls.addLine('┃ 🌰栗子：探索hp')
        cls.addLine('┗━━━━━━━━━━━━┄')
        cls.send()
    }
}