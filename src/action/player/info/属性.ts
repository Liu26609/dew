import APP from "../../../APP";
import server from "../../../server";
import temp_img from "../../../temp/temp_img";
import { temp_card } from "../../../temp/temp_text";
import message from "../../../trigger/message";

export default class {
    constructor(cls: message) {
        this.start(cls)

    }
    async start(cls: message) {
        let req = await server.api('player/info/GetBase', {}, cls)
        if(!req)return;
        let _s = req.sys;
        let temp = new temp_card();
        temp.set_title('我的属性', '🧙')
        temp.add(`🔯血统:${req.inherit}[${req.className}]`)
        temp.add(`🧙${req.name}`)
        let attList = req.att;
        for (let i = 0; i < attList.length; i++) {
            const att = attList[i];
            if(att.hide)continue;
            let icon = APP.getAttIcon(att.key);
            switch (att.t) {
                case 'body_bar':
                    temp.add(`${icon}${APP.getSysCover(_s,att.name)}:${att.now}/${att.max}`)
                    break;
                case 'att_val':
                    if(att.val == 0){
                        continue;
                    }
                    if(!att.hide){
                        temp.add(`${icon}${APP.getSysCover(_s,att.name)}:${att.val}`)
                    }
                    break;
                default:
                    temp.add('┃未知属性类型:' + att.t)
                    break;
            }
        }
        let barstr = [];
        let attstr = [];
        for (let i = 0; i < attList.length; i++) {
            const att = attList[i];
            if(att.hide)continue;
            let icon = APP.getAttIcon(att.key);
            switch (att.t) {
                case 'body_bar':
                    barstr.push({key:`${APP.getSysCover(_s,att.name)} ${att.now}/${att.max}`,bar:(att.now/att.max)*100})
                    break;
                case 'att_val':
                    if(att.val == 0){
                        continue;
                    }
                    if(!att.hide){
                        attstr.push(`${icon}${APP.getSysCover(_s,att.name)}  ${att.val}`)
                    }
                    break;
                default:
                    temp.add('┃未知属性类型:' + att.t)
                    break;
            }
        }
        temp_img.render(cls,'att',{
            name:req.name,
            leve:req.leve,
            sys:req.sys,
            inherit:req.inherit,
            className:req.className,
            att:attstr,
            barstr:barstr
        })
        cls.send_v2(temp)
    }
}