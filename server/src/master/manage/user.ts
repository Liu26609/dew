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
    save(onlyid: string,create?) {
        let data = { ...this.userMap.get(onlyid) } as player;
        // 去掉全部带下划线的属性
        let sk_acitve:any[] = []
        for (let i = 0; i < data.sk_active.length; i++) {
            const sk = data.sk_active[i];
            sk_acitve.push(sk.save())
        }
        data['sk_active'] = sk_acitve;
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (key.indexOf('_') == 0) {
                    delete data[key];
                }
            }
        }
        if(create){
            db.update('user', { id: onlyid }, data)
        }else{
            db.insert('user', data)
        }
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
        data.attList.push(new att_val({ name: '战力', key: _att_key.战斗力, val: 10 }))
        data.attList.push(new att_val({ name: '等级', key: _att_key.等级, val: 10 }))
        data.attList.push(new body_bar({ name: '生命值', key: _att_key.生命, max: 100, now: 100 }))
        data.attList.push(new body_bar({ name: 'EXP', key: _att_key.经验值, max: 100, now: 100 }))
        data.attList.push(new att_val({ name: '攻击力', key: _att_key.物理攻击, val: 10 }))
        data.attList.push(new att_val({ name: '防御力', key: _att_key.物理防御, val: 10 }))


        let u = new player(data);
        this.createFix(u)
        this.userMap.set(onlyid, u);
        console.log('创建用户:', onlyid)
        this.save(onlyid,true)
        return u;
    }
    private createFix(p: player) {
        p.addSk_active('普通攻击')
    }
}
export default new user()