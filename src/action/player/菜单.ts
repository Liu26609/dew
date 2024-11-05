import { temp_card } from "../../temp/temp_text";
import message from "../../trigger/message";


export default class {
    constructor(cls: message, data: number) {
        this.start(cls);
    }

    async start(cls: message) {
        // 任务列表
        let temp = new temp_card();
        temp.set_title('角色相关', '📜')
        temp.add('【角色改名】💡修改我的角色名')
        temp.add('【任务】💡超多奖励等你来拿')
        temp.add('【属性】💡查看我的属性')
        temp.add('【技能】💡角色技能相关指令')
        temp.add('【背包】💡查看我的背包')
        temp.add('【血统】💡角色血统相关指令')
        temp.add('【装备】💡装备相关指令')
        cls.send_v2(temp)
    }
}