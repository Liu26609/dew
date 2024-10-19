import db from "../../model/db/db";
import { _att_key } from "../../shared/shareFace";
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
        data.attList.push(new att_val({ key: _att_key.魔法值, val: 0 }))
        data.attList.push(new att_val({ key: _att_key.物理攻击, val: 10 }))
        data.attList.push(new att_val({  key: _att_key.物理防御, val: 1 }))
        data.attList.push(new att_val({  key: _att_key.魔法攻击, val: 0 }))
        data.attList.push(new att_val({ key: _att_key.魔法防御, val:0 }))
        data.attList.push(new att_val({ key: _att_key.技能急速, val: 0 }))
        data.attList.push(new att_val({  key: _att_key.物理暴击率, val: 0 }))
        data.attList.push(new att_val({ key: _att_key.魔法暴击率, val: 0 }))
        data.attList.push(new att_val({key: _att_key.物理护盾, val: 0 }))
        data.attList.push(new att_val({  key: _att_key.魔法护盾, val: 0 }))
        data.attList.push(new att_val({ key: _att_key.生命护盾, val: 0 }))

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