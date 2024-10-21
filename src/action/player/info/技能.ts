import APP from "../../../APP";
import server from "../../../server";
import message from "../../../trigger/message"



export default class {
    constructor(cls: message, ...data) {
        console.log('技能', data)
        this.start(cls, ...data)
    }

    async start(cls: message, ...data) {
        if (!data || data.length == 0) {
            this.look(cls)
        } else if (data.length >= 1) {
            let actionKey = data[0]
            let skill_id = data[1]
            console.log('actionKey',actionKey)
            switch (actionKey) {
                case '查看':
                    this.look_index(cls, skill_id)
                    break;
                case '遗忘':
                    this.rm(cls, skill_id)
                    break;
                case '改名':
                    this.rename(cls, skill_id, data[2])
                    break;
                default:
                    cls.addLine('你好像输入了一个无效指令呢~[指令 + hp]可查看帮助')
                    cls.send()
                    break;
            }
        }
    }
    async rename(cls: message, idx: number, name: string) {
        let req = await server.api('player/skill/Rename',{idx:idx,rename:name},cls);
        if(!req)return;
        cls.addLine('技能改名成功')
        cls.send()
    }
    async rm(cls: message, idx: number) {
        let req = await server.api('player/skill/Rm',{idx:idx},cls);
        if(!req)return;
        cls.addLine('技能遗忘成功')
        cls.send()
    }
    async look_index(cls: message, idx: number) {
        let req = await server.api('player/skill/Look',{
            idx:idx
        },cls);
        if(!req)return;
        let temp = '';
        temp += '📜技能详情\n'
        temp += `名称: ${req.name}\n`
        temp += `冷却: ${req.cd}回合\n`
        temp += `类型: ${req.type === 0 ? '主动技能' : '被动技能'}\n`
        temp += `技能描述: ${req.desc}\n`
        cls.addLine(temp)
        cls.send()
    }
    async look(cls: message) {
        console.log('查看全部技能')
        let req = await server.api('player/skill/List',{},cls);
        if(!req)return;
        let list = req.list;
        let temp = '';
        temp += '📜技能列表\n'
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            temp += `${i + 1}.${element.name}\n`
        }
        cls.addLine(temp)
        cls.send()
    }
}