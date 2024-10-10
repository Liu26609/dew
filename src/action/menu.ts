import message from "../trigger/message";

export default class {
    constructor(cls:message){
        cls.addLine('┏┄══✉️菜单列表══━┄')
        cls.addLine('┃ [活动]查看当前进行的活动')
        cls.addLine('┃ [位置]查看当前位置')
        cls.addLine('┃ [任务]超多任务等你参与')
        cls.addLine('┃ [我的]与我相关')
        cls.addLine('┃ V1.0.2')
        cls.addLine('┗━━━━━━━━━━━━┄')
        cls.send()
    }
}