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
                this.select(cls, 0);
                break;
            case '高级':
                this.select(cls, 1);
                break;
            default:
                this.menu(cls);
                break;
        }
    }
    async select(cls: message, leve: number) {
        // 选择技能类型
        // 选择技能目标
        // 选择技能范围
        let type = SKILL_type.主动技能;
        let target = SKILL_target.敌方;
        let rang_type = SKILL_rang.范围;
        cls.send_v1(`请${cls.At()}输入数字选择技能类型\n[1]主动技能\n[2]被动技能`)
        let sk_type = await cls.wait_nextInput(30)
        if (sk_type == '1') {
            type = SKILL_type.主动技能;
        } else if (sk_type == '2') {
            type = SKILL_type.被动技能;
        }
        cls.send_v1(`已选择${type? '主动':'被动'}型技能`);
        cls.send_v1(`请${cls.At()}输入数字选择技能目标\n[1]敌方\n[2]自己`,1)
        let sk_tag = await cls.wait_nextInput(30);
        switch (sk_tag) {
            case '1':
                target = SKILL_target.敌方;
                break;
            case '2':
                target = SKILL_target.自己;
                break;
            default:
                break;
        }
        cls.send_v1(`已选择技能目标为:${sk_tag}`);
        cls.send_v1(`请${cls.At()}输入数字选择技能范围\n[1]单体技能\n[2]群体技能`,1)
        let sk_rang = await cls.wait_nextInput(30);
        if(sk_rang == '1'){
            rang_type = SKILL_rang.单体;
        }else if(sk_rang == '2'){
            rang_type = SKILL_rang.范围;
        }
        cls.send_v1(`已选择范围为:${sk_rang? '单体':'群体'}技能`);
        let req =  await server.api('active/Create_skill',{type:type,target:target,rang_type:rang_type,leve:leve},cls)
        if(!req){return;}
        temp_img.temp_prop_skill(req,cls)
    }   

    menu(cls: message) {
        let card = new temp_card();
        card.set_title('技能祈愿');
        card.line('技能祈愿是一种获取技能的方式，通过祈愿可获得独一无二的技能,普通祈愿消耗1金币，高级祈愿消耗5金币,高级祈愿有概率获得更强力的技能');
        card.br();
        card.set_title_line('祈愿说明', '📜');
        card.add('1.技能由AI生成');
        card.add('2.不可控技能管理员可删除技能退回金币');
        card.select(['技能祈愿 普通', '技能祈愿 高级']);
        cls.send_v2(card);
    }
}