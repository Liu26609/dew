import { player } from "../../../model/fight/body/player";
import { template } from "../../../shared/master/MsgAction";
import db from "../../../model/db/db";
import manage_word from "./manage_word";
import server_mail from "../../../server_mail";
import { mail_item } from "../../../shared/interface";
import { logger } from "../../../model/server/logger";
import app from "../../../app";

class manage_user {
    private userMap: Map<string, player> = new Map();
    constructor() {

    }
    init() {
        setInterval(() => {
            this.checkOnline();
        }, 1000); // 60000毫秒 = 1分钟
    }
    private checkOnline() {
        logger.debug(`在线玩家${this.userMap.size}`)
        const currentTime = Date.now();
        this.userMap.forEach((player, key) => {
            const lastActiveTime = player._lastActiveTime; // 假设player对象有lastActiveTime属性
            const timeSinceLastActive = currentTime - lastActiveTime;
            const offlineThreshold = 6 * 60 * 1000; // 5分钟的毫秒数
            if (timeSinceLastActive > offlineThreshold) {
                this.offLine(player)
                // 用户已经超过5分钟未活动，可以移除
            }
        });
    }
    async offLine(data: player) {
        if (data.get_battle()) {
            logger.debug(`用户${data.name} 战斗中下线失败`)
            return;
        }
        console.log(`用户 ${data.name} 已下线`);
        try {
            this.userMap.delete(data.uuid);
            await this.save(data)
            data.getPosition()?.del(data, true);
            data.getPosition()?.getWord().outPlayer(data);
        } catch (error) {
            console.error(error)
        }
    }
    async offAll(){
         this.userMap.forEach(async element => {
            await this.offLine(element)
        });
    }
    locaHas(uuid: string) {
        return this.userMap.get(uuid)
    }
    async has(onlyid: string) {
        if (this.locaHas(onlyid)) {
            return this.locaHas(onlyid)
        }

        let sqdata = await db.sql(`SELECT * FROM player WHERE uuid=?;`, [onlyid]);
        if (sqdata.length > 0) {
            // 文件存在 但未读取
            const data = sqdata[0].data;
            const PlayerClass = await import('../../../model/fight/body/player')
            let p = new PlayerClass.player();
            p.reload(data);
            await this.addUser(p);
            // 检查邮件
            let list: mail_item[] = []
            server_mail.c_http.callApi('Pull', { uuid: p.uuid, dev: p.mail_serverDev }).then((req) => {
                if (req.isSucc) {
                    list = req.res.list
                    if (list.length > 0) {
                        p.mail.push(...list)
                    }
                    p.mail_serverDev = req.res.dev;
                } else {
                    logger.error('邮箱服务器请求失败')
                }
            })

        }
        return this.locaHas(onlyid);
    }
    async addUser(body: player) {
        let _word = manage_word.getWord('1');
        await _word.joinPlayer(body)

        this.userMap.set(body.uuid, body)
    }
    sendAllMsg(tel: template, data?) {
        let LastLocationMap: Map<string, player> = new Map();

        this.userMap.forEach(element => {
            LastLocationMap.set(element._LastLocation, element)
        });
        LastLocationMap.forEach(element => {
            element.sendMsg(tel, data);
        });
    }
    getOnlineCont() {
        return this.userMap.size
    }
    async save(body: player) {
        let obj = app.sanitizeObject(body);

        const sql = `INSERT INTO player (uuid, data)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE
        uuid = VALUES(uuid),
        data = VALUES(data)`;
        try {
            await db.sql(sql, [body.uuid, JSON.stringify(obj)])
        } catch (error) {
            debugger
        }
    }
}
export default new manage_user();