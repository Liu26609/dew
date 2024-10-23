import { off } from "process";
import db from "../../model/db/db";
import { _att_key } from "../../shared/protocols/shareFace";
import common from "../lib/common";
import { body_bar, att_val } from "../lib/unity/base/body_com";
import { player } from "../lib/unity/player"
import cron from 'node-cron';

class user {
    userMap: Map<string, player> = new Map();
    constructor() {
        cron.schedule('*/1 * * * *', this.checkOffLine.bind(this));
    }
    // node-cron定时每间隔5分钟遍历一次用户列表，将超过5分钟未活跃的用户移除
    private checkOffLine() {
        const now = Date.now();
        this.userMap.forEach((user, key) => {
            if (now - user.lastActiveTime > 5 * 60 * 1000) { // 5 minutes in milliseconds
                this.offLine(user.id);
            }
        });
    }
    offLine(onlyid: string) {
        // TODO: 检查玩家是否还处于战斗中，如果是则不移除
        this.save(onlyid);
        console.log(`Removed inactive user: ${onlyid}`);
        this.userMap.delete(onlyid);
    }
    locaHas(onlyid: string) {
        return this.userMap.get(onlyid)
    }
    save(onlyid: string, create?) {
        let data = common.sanitizeObject(this.userMap.get(onlyid));
        if (create) {
            db.update('user', { id: onlyid }, data)
        } else {
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
        data.attList.push(new att_val({ key: _att_key.生命值, val: 0 }))
        data.attList.push(new att_val({ key: _att_key.魔法恢复, val: 0 }))
        data.attList.push(new att_val({ key: _att_key.生命恢复, val: 0 }))
        data.attList.push(new att_val({ key: _att_key.魔法值, val: 0 }))
        data.attList.push(new att_val({ key: _att_key.物理攻击, val: 10 }))
        data.attList.push(new att_val({ key: _att_key.物理防御, val: 1 }))
        data.attList.push(new att_val({ key: _att_key.魔法攻击, val: 0 }))
        data.attList.push(new att_val({ key: _att_key.魔法防御, val: 0 }))
        data.attList.push(new att_val({ key: _att_key.技能急速, val: 0 }))
        data.attList.push(new att_val({ key: _att_key.物理暴击率, val: 0 }))
        data.attList.push(new att_val({ key: _att_key.魔法暴击率, val: 0 }))
        data.attList.push(new att_val({ key: _att_key.物理护盾, val: 0 }))
        data.attList.push(new att_val({ key: _att_key.魔法护盾, val: 0 }))
        data.attList.push(new att_val({ key: _att_key.生命护盾, val: 0 }))

        let u = new player(data);
        this.createFix(u)
        this.userMap.set(onlyid, u);
        console.log('创建用户:', onlyid)
        this.save(onlyid, true)
        return u;
    }
    private createFix(p: player) {
        p.addSk_active('普通攻击')
    }
}
export default new user()