import server from "../../../server";
import message from "../../../trigger/message";

export default class{
    constructor(cls: message, ...data) {
        console.log('背包', data)
        this.start(cls, ...data)
    }

    async start(cls: message, ...data) {
        if (!data || data.length == 0) {
            this.list(cls)
        } else if (data.length >= 1) {
            switch (data[0]) {
                case '查看':
                    this.look(cls, data[1])
                    break;
                default:
                    this.list(cls)
                    break;
            }
        }
    }
    async list(cls: message) {
        let req = await server.api('player/bag/List',{},cls);
        if(!req)return;
        let temp = `背包信息\n`;
        for (let i = 0; i < req.list.length; i++) {
            const element = req.list[i];
            temp += `[${i + 1}]┃${element.name}X${element.cont}\n`
        }
        if(req.list.length == 0){
             temp += `你的背包里什么东西都没有呢~`
        }
        cls.addLine(temp)
        cls.send()
    }
    async look(cls: message, idx: number) {

    }
}