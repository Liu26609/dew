import server from "../../server";
import { SKILL_type } from "../../shared/master/shareFace";
import temp_img from "../../temp/temp_img";
import { temp_card } from "../../temp/temp_text";
import message from "../../trigger/message";

export default class {
    constructor(cls: message, ...data) {
        this.start(cls, ...data);
    }
    start(cls: message, ...data) {
        if (!data || data.length == 0) {
            this.menu(cls)
            return;
        }
        switch (data[0]) {
            case '普通':
                this.select(cls, 1);
                break;
            case '高级':
                this.select(cls, 10);
                break;
            default:
                this.menu(cls);
                break;
        }
    }
    async select(cls: message, cont: number) {
        let req =  await server.api('active/Create_equip',{cont:cont},cls)
        if(!req){return;}
        // temp_img.temp_prop_skill(req,cls)
    }   

    menu(cls: message) {
        let card = new temp_card();
        card.set_title('装备祈愿');
        card.line('装备祈愿是一种获取装备的方式，通过祈愿可获得专属体系的装备,普通祈愿有概率获得装备,高级祈愿必得装备✨每天首次免费哦');
        card.br();
        card.select(['装备祈愿 普通', '装备祈愿 高级']);
        cls.send_v2(card);
    }
}