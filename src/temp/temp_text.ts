import APP from "../APP";
import { transaction_create } from "../shared/master/MsgAction";
import { ResList } from "../shared/master/player/bag/PtlList";
import { ResPosition } from "../shared/master/player/info/PtlPosition";
import { Item_Type, prop_item_equip, prop_item_skill, taskData } from "../shared/master/shareFace";
import message from "../trigger/message";
import temp_img from "./temp_img";
export class temp_card {
    list: string[] = [];
    constructor() {

    }
    set_title(title: string, icon?: string) {
        if (!icon) {
            icon = '📜';
        }
        this.list.push(`ⓘ      ${icon}${title}        ⓧ`)
    }
    set_title_line(title: string, icon?: string) {
        if (!icon) {
            icon = '📜'
        }
        this.list.push(`✦─✧${icon}${title}✧─✦`)

    }
    select(select: string[]) {
        this.set_title_line('操作选择', '🏧')
        for (let i = 0; i < select.length; i++) {
            const element = select[i];
            this.add(`【${element}】`)
        }
    }
    br() {
        this.list.push(``)
    }
    line(str: string) {
        this.list.push(`「${str}」`)
    }
    add(str: string) {
        this.list.push(`${str}`)
    }
    text() {
        let text = '';
        for (let i = 0; i < this.list.length; i++) {
            const element = this.list[i];
            text += `${element}\n`;
            if (i == 0) {
                text += `◤                                    ◥\n`
            }
        }
        text += `◣          ✎V0.32              ◢`
        return text;
    }
}
class temp_text {
    constructor() {

    }
    /**
     * 背包列表展示
     */
    bag_list(data: ResList, cls: message) {
        if (!data) return;
        let filter = data.filter;
        let title = '我的背包'
        if(filter != undefined){
            switch (filter) {
                case Item_Type.技能书:
                    title = '技能背包';
                    break;
                case Item_Type.装备:
                    title = '装备背包';
                    break;
                case Item_Type.道具:
                    title = '道具背包';
                    break;
                default:
                    break;
            }
        }
        let temp = new temp_card();
        temp.set_title(title, '🎒')
        temp.add(`💰金币:${data.gold}`)
        for (let i = 0; i < data.list.length; i++) {
            const element = data.list[i];
            temp.add(`[${element.idx + 1}]${element.name}X${element.cont}`)
        }
        if (data.list.length == 0) {
            temp.add(`${title}里什么东西都没有呢~`)
        }
        cls.send_v2(temp)
    }
    /**
     * 道具查看
     */
    async prop_look(data: { type: Item_Type; temp: any }, cls: message) {
        if (!data || !data.temp) {
            cls.send_v1('物品查看出错.请上报日志')
            return;
        }
        let text: temp_card;
        switch (data.type) {
            case Item_Type.装备:
                text = await this.temp_prop_equip(data.temp)
                cls.send_v2(text)

                temp_img.temp_prop_equip(data.temp,cls)
                break;
            case Item_Type.技能书:
                text = await this.temp_prop_skill(data.temp, cls)
                cls.send_v2(text)
                break;
            case Item_Type.道具:
                text = await this.temp_prop_item(data.temp)
                cls.send_v2(text)

                break;
            default:
                break;
        }
    }
    private async temp_prop_item(data: any) {

        let temp = new temp_card();
        temp.set_title('道具查看', '📦')
        temp.add(`🏷️名称-${data.name}`)
        temp.set_title_line('道具描述', 'ℹ️')
        temp.add(`「${data.desc}」`)

        return temp
    }
    async temp_prop_equip(data: prop_item_equip) {
        let temp = new temp_card();
        temp.set_title('装备查看', '🗡️')
        temp.add(`🏷️${data.name}+${data.leve_strengthen.now}`)
        temp.add(`🔥战力:${data.fight}`)
        temp.add(`「${data.desc}」`)
        temp.add(`✡️${data.sys}·${data.type}`)
        temp.set_title_line('装备属性', '🔺')
        for (let i = 0; i < data.att.length; i++) {
            const element = data.att[i];
            temp.add(`${APP.getAttIcon(element.key)}${APP.getSysCover(data.sys, element.name)}:${element.val}`)
        }
        return temp;
    }
    async temp_position(data:ResPosition,cls:message){
        let temp = new temp_card();
        switch (data.name) {
            case '主神空间':
                temp.set_title('主神空间', '🌌')
                temp.add(`🌍坐标${data.pos[0]}-${data.pos[1]}`)
                temp.add(`🧙世界玩家:${data.online}`)
                break;

            default:
                temp.set_title('我的位置', '🌍')
                temp.add(`🌍坐标${data.pos[0]}-${data.pos[1]}`)
                temp.line(`当前世界:${data.name}`)
                temp.add(`🧙世界玩家:${data.online}`)
                break;
        }
        let list = data.list;
        let battle = data.battle;
        temp.set_title('当前位置', '⚔️')
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            temp.add(`${element.name}`)
        }
        temp.set_title_line('选择行动', '🔍')
        if(battle){
            temp.add(`【战斗】         【探索】`)
        }else{
            temp.add(`         【探索】`)
        }
        cls.send_v2(temp)
    }
    async temp_prop_skill(data: prop_item_skill, cls: message) {
        let temp = new temp_card();
        temp.set_title('技能查看', '🧙')
        temp.add(`🏷️${data.name}Lv.${data.leve}`)
        temp.add(`⏳EXP:${data.leve_exp.now.toFixed(0)}/${data.leve_exp.max.toFixed(0)}`)
        temp.set_title_line('技能描述', 'ℹ️')
        temp.add(`「${data.desc}」`)
        temp.br();
        temp.add(`🕢冷却：${data.cd}回合`)
        temp.add(`类型：${data.type === 0 ? '主动技能' : '被动技能'}`)

        // 图片模式
        // temp_img.temp_prop_skill(data,cls)

        return temp;

    }
    temp_task(data: taskData) {
        let taskData = data;
        let temp = new temp_card();
        temp.set_title('任务详情', '📜')
        temp.line(`[${taskData.name}]${taskData.desc}`)
        temp.set_title_line('任务条件', '🎯')
        for (let i = 0; i < taskData.condition.length; i++) {
            const element = taskData.condition[i];
            let str = element.desc.replace('target', `(${element.progress}/${element.target})`)
            let icon = element.target > element.progress ? '❌' : '✅'
            temp.add(`${icon}${str}`)
        }
        temp.set_title_line('任务奖励', '🎁')
        for (let i = 0; i < taskData.reward.length; i++) {
            const element = taskData.reward[i];
            temp.add(`${element.icon}${element.name}X${element.cont}`)
        }
        if (taskData.isComplete) {
            temp.set_title_line('任务状态', '✅')
            temp.add('任务已完成奖励已经发放')
        }

        temp.add(`🕢剩余${APP.countdown(taskData.endtime - Date.now())}`)
        return temp
    }
    transaction_create(data: transaction_create) {
        let temp = new temp_card();
        temp.set_title('交易确认', '⚖️')
        for (let i = 0; i < data.items.length; i++) {
            const element = data.items[i];
            temp.add(`┌${element.icon}${element.name}x${element.need}`)
            if (element.now < element.need) {
                temp.add(`└❌当前拥有:${element.now}`)
            } else {
                temp.add(`└✅当前拥有:${element.now}`)
            }
        }
        temp.set_title_line('交易原因', 'ℹ️')
        temp.add(`「${data.res}」`)
        temp.set_title_line('操作选择', '🏧')
        temp.add('【确认】         【取消】')
        return temp;
    }
}
export default new temp_text();