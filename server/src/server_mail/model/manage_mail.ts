import app from "../../app";
import { face_prop_item, mail_item } from "../../shared/shareFace"
import db from "../../model/db/db";

class manage_mail {
    listMap: Map<string, mail_item[]> = new Map();
    sysListMap: Map<number, mail_item> = new Map();
    sysDev: number = 0;
    constructor() {

    }
    async init() {
        // 加载数据库邮件
        let data_user = await db.sql(`SELECT * FROM mail`, []);
        let data_sys = await db.sql(`SELECT * FROM mail_sys`, []);
        for (const member of data_user) {
            this.listMap.set(member.uuid, member.data);
        }
        for (const member of data_sys) {
            if (Number(member.uuid) > this.sysDev) {
                this.sysDev = Number(member.uuid)
            }
            this.sysListMap.set(Number(member.uuid), member.data);
        }
        // app.createCfgItem('prop-18', 100, '版本更新')
        let item_a = app.createCfgItem('prop-23', 100, '版本更新')
        item_a.cont_change(20)
        // prop-20
        let item_b = app.createCfgItem('prop-20', 100, '版本更新')
//         this.sendServerMail({
//             create: Date.now(),
//             from: {
//                 uuid: app.v4(),
//                 name: "sys"
//             },
//             to: {
//                 uuid: "20"
//             },
//             title: "v0.20版本更新",
//             content: `【【增加】npc 指令提示功能
// 【增加】地图-澳门,小游戏-猜数
// 【修复一个bug】尝试修复位置异常后艾特机器人没反应
// 【调整】拍卖行时间上限降低
// `,
//             annexs: [item_a]
//         })
    }
    async sendServerMail(item: mail_item) {
        // item.to.uuid 为版本号
        this.sysListMap.set(Number(item.to.uuid), item)
        console.log(':::系统发件成功')
        const sql = `INSERT INTO mail_sys (uuid, data)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE
        uuid = VALUES(uuid),
        data = VALUES(data)`;
        await db.sql(sql, [item.to.uuid, JSON.stringify(item)])
    }
    async send(item: mail_item) {
        let list = this.listMap.get(item.to.uuid) || []
        list.push(item)
        this.listMap.set(item.to.uuid, list)
        const sql = `INSERT INTO mail (uuid, data)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE
        uuid = VALUES(uuid),
        data = VALUES(data)`;
        await db.sql(sql, [item.to.uuid, JSON.stringify(list)])
    }
    async pull(uuid: string, sysDev: number) {
        const list = this.listMap.get(uuid) || [];
        this.listMap.delete(uuid)

        this.sysListMap.forEach((element, dev) => {
            if (dev > sysDev) {
                try {
                list.push(element)
                    
                } catch (error) {
                    debugger
                }
            }
        });
        const sql = `DELETE FROM  mail WHERE uuid=?`;
        await db.sql(sql, [uuid]);

        return list
    }
}
export default new manage_mail()