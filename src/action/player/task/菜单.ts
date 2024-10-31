import server from "../../../server";
import { temp_card } from "../../../temp/temp_text";
import message from "../../../trigger/message";


export default class {
    constructor(cls: message, data: number) {
        this.start(cls);
    }

    async start(cls: message) {
        let req = await server.api('player/task/Look', {}, cls)
        if (!req) return;

        let taskData = req;
        let temp = new temp_card();
        temp.set_title('任务详情', '📜')
        temp.line(`[${taskData.name}]${taskData.desc}`)
        temp.set_title_line('任务条件', '🎯')
        for (let i = 0; i < taskData.condition.length; i++) {
            const element = taskData.condition[i];
            temp.add(`[x]${element.target}(${element.progress}/${element.target})`)
        }
        temp.set_title_line('任务奖励', '🎁')
        for (let i = 0; i < taskData.reward.length; i++) {
            const element = taskData.reward[i];
            temp.add(`${element.icon}${element.name}X${element.cont}`)
        }
        temp.set_title_line('任务状态', '📝')
        if(taskData.isComplete){
            temp.add('任务已完成奖励已经发放')
        }else{
            temp.add('任务未完成')
        }
        temp.add(`任务倒计时:${taskData.endtime / 1000}s`)
        cls.send_v2(temp)
    }

}