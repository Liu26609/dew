import message from "../../trigger/message"

export default class {
    constructor(cls:message){
        cls.addLine('┏┄══✉️基础指令══━┄')
        cls.addLine('[角色]查看自身相关的指令')
        cls.addLine('[世界]查看世界相关指令')
        cls.addLine('[设置]个人设置')
        cls.addLine('┃════✉️提示系统═━┄')
        cls.addLine('[指令 + hp]可查看指令的描述')
        cls.addLine('🌰栗子：探索hp')
        cls.addLine('┗━━━━━━━━━━━━┄')
        cls.send()
    }
}