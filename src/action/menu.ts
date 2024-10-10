import message from "../trigger/message";

export default class {
    constructor(cls:message){
        cls.addLine('┏┄══✉️菜单列表══━┄')
        cls.addLine('┃ [位置]查看当前位置')
        cls.addLine('┃ [all]艾特全体测试')
        cls.addLine('┃ V1.0.2')
        cls.addLine('┗━━━━━━━━━━━━┄')
        cls.send()
    }
}