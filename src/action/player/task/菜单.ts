import APP from "../../../APP";
import actionCfg from "../../../cfg/actionCfg";
import server from "../../../server";
import temp_text, { temp_card } from "../../../temp/temp_text";
import message from "../../../trigger/message";


export default class {
    constructor(cls: message, data: number) {
        this.start(cls);
    }

    async start(cls: message) {
        // 任务列表
        let req = await server.api('player/task/List',{},cls)
        if(!req) return;
        let list = req.list;
        // 遍历 list 如果没有在 actionCfg数组 中，则添加到 actionCfg 中
        list.forEach(v=>{
            if(!actionCfg.find(v2=>v2.key === v)){
                let cfg = {
                    key: v,
                    key_tips: `${v}`,
                    tips: v,
                    example: [`@bot ${v}`],
                    path: 'player/task/查看任务'
                }
                actionCfg.push({
                    key: v,
                    key_tips: `${v}`,
                    tips: v,
                    example: [`@bot ${v}`],
                    path: 'player/task/查看任务'
                })
                APP.addCommon(cfg);
            }
        })


        let temp = new temp_card();
        temp.set_title('任务清单', '📜')
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            temp.add(`📜${element}`) 
        }
        cls.send_v2(temp)
       
    }
}