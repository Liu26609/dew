import APP from "../APP";
import { transaction_create } from "../shared/master/MsgAction";
import { ResList } from "../shared/master/player/bag/PtlList";
import { Item_Type, prop_item_equip, prop_item_skill } from "../shared/PtlFace";
import message from "../trigger/message";
export class temp_card{
    list:string[] = [];
    constructor(){

    }
    set_title(title:string,icon?:string){
        if(!icon){
            icon = '📜';
        }
        this.list.push(`ⓘ      ${icon}${title}        ⓧ`)
    }
    set_title_line(title:string,icon?:string){
        if(!icon){
            icon = '📜'
        }
        this.list.push(`✦─✧${icon}${title}✧─✦`)

    }
    br(){
        this.list.push(``)
    }
    line(str:string){
        this.list.push(`「${str}」`)
    }
    add(str:string){
        this.list.push(`${str}`)
    }
    text(){
        let text = '';
        for (let i = 0; i < this.list.length; i++) {
            const element = this.list[i];
            text += `${element}\n`;
            if(i == 0){
                text += `◤                                    ◥\n`
            }
        }
        text += `◣                                    ◢\n`
        text += `✎文字排版:v0.3`
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
        let temp = new temp_card();
        temp.set_title('背包信息','🎒')
        for (let i = 0; i < data.list.length; i++) {
            const element = data.list[i];
            temp.add(`[${element.idx + 1}]${element.name}X${element.cont}`)
        }
        if (data.list.length == 0) {
            temp.add('你的背包里什么东西都没有呢~')
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
        let text:temp_card;
        switch (data.type) {
            case Item_Type.装备:
                text = await this.temp_prop_equip(data.temp)
                break;
            case Item_Type.技能书:
                text = await this.temp_prop_skill(data.temp)
                break;
            case Item_Type.道具:
                text = await this.temp_prop_item(data.temp)
                break;
            default:
                break;
        }
        cls.send_v2(text)
    }
    private async temp_prop_item(data: any) {

        let temp = new temp_card();
        temp.set_title('道具查看','📦')
        temp.add(`🏷️名称-${data.name}`)
        temp.set_title_line('道具描述','ℹ️')
        temp.add(`「${data.desc}」`)

        return temp
    }
    private async temp_prop_equip(data: prop_item_equip) {
        let temp = new temp_card();
        temp.set_title('装备查看','🗡️')
        temp.add(`🏷️名称-${data.name}`)
        temp.add(`「${data.tips}」`)
        temp.set_title_line('装备属性','🔺')
        for (let i = 0; i < data.att.length; i++) {
            const element = data.att[i];
            temp.add(`┃${APP.getSysCover(data.sys, element.name)}:${element.val}`)
        }
        return temp;
    }
    private async temp_prop_skill(data: prop_item_skill) {
        let temp = new temp_card();
        temp.set_title('技能查看','🧙')
        temp.add(`🏷️名称-${data.name}`)
        temp.set_title_line('技能描述','ℹ️')
        temp.add(`「${data.desc}」`)
        temp.br();
        temp.add(`冷却：${data.cd}回合`)
        temp.add(`类型：${data.type === 0 ? '主动技能' : '被动技能'}`)
        return temp;

    }

    transaction_create(data: transaction_create) {
        let temp = new temp_card();
        temp.set_title('交易确认','⚖️')
        for (let i = 0; i < data.items.length; i++) {
            const element = data.items[i];
            temp.add(`┌💠${element.name}x${element.need}`)
            if(element.now < element.need){
                temp.add(`└❌当前拥有:${element.now}`)
            }else{
                temp.add(`└✅当前拥有:${element.now}`)
            }
        }
        temp.set_title_line('交易原因','ℹ️')
        temp.add(`「${data.res}」`)
        temp.set_title_line('操作选择','🏧')
        temp.add('【确认】         【取消】')
        return temp;
    }
}
export default new temp_text();