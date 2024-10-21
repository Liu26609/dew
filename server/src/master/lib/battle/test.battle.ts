import { _att_key } from "../../../shared/shareFace";
import common from "../common";
import { battle_group } from "../face/FACE_BODY";
import { SKILL_rang, SKILL_eff_type, SKILL_eff_type_伤害类, SKILL_target, SKILL_eff_type_增益类, SKILL_eff_path } from "../face/FACE_SKILL";
import { body_bar, att_val } from "../unity/base/body_com";
import { unity } from "../unity/unity";
import { battle } from "./battle";
export class test_battle {
    constructor() {

    }
    create_unity() {
        let data: any = {};
        data.name = `测试单位${common.random(1000, 9999)}`;
        data.attList = [];
        data.attList.push(new body_bar({ name: '生命值', key: _att_key.生命值, max: 100, now: 100 }))
        data.attList.push(new att_val({ name: '攻击力', key: _att_key.物理攻击, val: 10 }))
        data.attList.push(new att_val({ name: '防御力', key: _att_key.物理防御, val: 10 }))


        data.sk_active = [];
        data.sk_active.push('普通攻击','大招')
        return new unity(data)
    }
    attack(a, b) {
        let bt = new battle();
        bt.join(battle_group.主场, a)
        bt.join(battle_group.客场, b)
        bt.start()
    }
}