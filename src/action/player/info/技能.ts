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
        } else if (data.length > 1) {
            let actionKey = data[0]
            let skill_id = data[1]
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
                    this.look(cls)
                    break;
            }
        }
    }
    async rename(cls: message, idx: number, name: string) {
        if (!name || name.length < 1) {
            console.log('名字不能为空')
            return
        }
        if (name.length > 10) {
            console.log('名字不能超过10个字符')
            return
        }
        if (name.includes('as') || name.includes('As')|| name.includes('@at')|| name.includes('<')|| name.includes('>')) {
            console.log('名字不能包含系统保留字')
            return
        }
        if (name.includes(' ')) {
            console.log('名字不能包含空格')
            return
        }
        console.log('改名技能',idx,name)

    }
    async rm(cls: message, idx: number) {
        console.log('遗忘技能')
    }
    async look_index(cls: message, idx: number) {
        console.log('查看指定技能', idx)
    }
    async look(cls: message) {
        console.log('查看全部技能')
    }
}