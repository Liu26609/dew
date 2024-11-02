import APP from "../../../APP";
import server from "../../../server";
import temp_text, { temp_card } from "../../../temp/temp_text";
import message from "../../../trigger/message";


export default class {
    constructor(cls: message, data: number) {
        this.start(cls);
    }

    async start(cls: message) {
        // 任务列表
        let temp = new temp_card();
        temp.set_title('任务清单', '📜')
        temp.add('😄每日任务')
        cls.send_v2(temp)
       
    }
}