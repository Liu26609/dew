import server from "../../server";
import { SKILL_rang, SKILL_target } from "../../shared/master/face/FACE_SKILL";
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
        let req =  await server.api('active/draw/Follow',{cont:cont},cls)
        if(!req){return;}
        // temp_img.temp_prop_skill(req,cls)
    }   

    menu(cls: message) {
        let card = new temp_card();
        card.set_title('随从祈愿');
        card.line('随从祈愿是一种获取随从的方式，通过祈愿可获得专属体系的随从,每次祈愿有概率获得随从碎片,高级祈愿必得随从碎片✨每天首次免费哦');
        card.br();
        card.select(['随从祈愿 普通', '随从祈愿 高级']);
        cls.send_v2(card);
    }
}