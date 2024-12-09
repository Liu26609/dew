import APP from "../../../APP";
import server from "../../../server";
import temp_img from "../../../temp/temp_img";
import temp_text, { temp_card } from "../../../temp/temp_text";
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
            console.log('actionKey', actionKey)
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
                case '升级':
                    this.up_level(cls, skill_id)
                    break;
                default:
                    cls.addLine('你好像输入了一个无效指令呢~[指令 + hp]可查看帮助')
                    cls.send()
                    break;
            }
        }
    }
    async rename(cls: message, idx: number, name: string) {
        let req = await server.api('player/skill/Rename', { idx: idx, rename: name }, cls);
        if (!req) return;
        cls.addLine('技能改名成功')
        cls.send()
    }
    async rm(cls: message, idx: number) {
        let req = await server.api('player/skill/Rm', { idx: idx }, cls);
        if (!req) return;
        cls.addLine('技能遗忘成功')
        cls.send()
    }
    async look_index(cls: message, idx: number) {
        let req = await server.api('player/skill/Look', {
            idx: idx
        }, cls);
        temp_img.temp_prop_skill(req,cls)
        // temp_text.prop_look({ type: Item_Type.技能书, temp: req }, cls)
    }
    async up_level(cls: message, idx: number) {
        await server.api('player/skill/UpLeve', { idx: idx }, cls);
    }
    async look(cls: message) {
        let req = await server.api('player/skill/List', {}, cls);
        if (!req) return;
        let list = req.list;
        let temp = new temp_card();
        temp.set_title('技能列表', '📜')
        if (list.length == 0) {
            temp.add('你还没有技能哦~')
        } else {
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                temp.add(`[${i + 1}]${element.name}`)
            }
        }
        cls.send_v2(temp);
    }
}