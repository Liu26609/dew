import db from "../../model/db/db";
import { _att_key } from "../lib/face/FACE_BODY";
import { SKILL_type, SKILL_target, SKILL_rang, SKILL_eff_path, SKILL_eff_type, SKILL_eff_type_伤害类 } from "../lib/face/FACE_SKILL";
import { body_bar, att_val } from "../lib/unity/base/body_com";
import { player } from "../lib/unity/player"

class user {
    userMap: Map<string, player> = new Map();
    constructor() {

    }
    locaHas(onlyid: string) {
        return this.userMap.get(onlyid)
    }
    save(onlyid: string) {
        let data = { ...this.userMap.get(onlyid) }
        // 去掉全部带下划线的属性
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (key.indexOf('_') === 0) {
                delete data[key];
            }
            }
        }
        db.update('user', { id: onlyid }, data)
    }
    async sqHas(onlyid: string) {
        let data = await db.find('user', { id: onlyid })
        if (data.length == 0) {
            return undefined
        }
        let p = new player(data[0]);
        this.userMap.set(onlyid, p);
        return p
    }
    create(onlyid: string) {
        let data: any = {};
        data.id = onlyid;
        data.attList = [];
        data.attList.push(new body_bar({ name: '生命值', key: _att_key.生命, max: 100, now: 100 }))
        data.attList.push(new att_val({ name: '攻击力', key: _att_key.物理攻击, val: 10 }))
        data.attList.push(new att_val({ name: '防御力', key: _att_key.物理防御, val: 10 }))

        
        let u = new player(data);
        this.createFix(u)
        this.userMap.set(onlyid, u);
        console.log('创建用户:', onlyid)
        db.insert('user', u)
        return u;
    }
    private createFix(p:player){
        p.pushSkill({
            name: '普通攻击',
            type: SKILL_type.主动技能,
            target: SKILL_target.敌人,
            desc: '对单个敌人造成(100%攻击力)物理伤害',
            cd: 1,
            rang_type: SKILL_rang.单体伤害,
            rang_num: 1,
            effects: [{
                tag: [SKILL_eff_path.动作, SKILL_eff_type.伤害类, SKILL_eff_type_伤害类.物理伤害],
                data: {
                    // 数值
                    val_str: `攻击力+测试力`
                }
            }]
        })
    }
}
export default new user()