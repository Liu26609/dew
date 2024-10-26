"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../app"));
const db_1 = __importDefault(require("../../model/db/db"));
class manage_mail {
    constructor() {
        this.listMap = new Map();
        this.sysListMap = new Map();
        this.sysDev = 0;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // 加载数据库邮件
            let data_user = yield db_1.default.sql(`SELECT * FROM mail`, []);
            let data_sys = yield db_1.default.sql(`SELECT * FROM mail_sys`, []);
            for (const member of data_user) {
                this.listMap.set(member.uuid, member.data);
            }
            for (const member of data_sys) {
                if (Number(member.uuid) > this.sysDev) {
                    this.sysDev = Number(member.uuid);
                }
                this.sysListMap.set(Number(member.uuid), member.data);
            }
            // app.createCfgItem('prop-18', 100, '版本更新')
            let item_a = app_1.default.createCfgItem('prop-23', 100, '版本更新');
            item_a.cont_change(20);
            // prop-20
            let item_b = app_1.default.createCfgItem('prop-20', 100, '版本更新');
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
        });
    }
    sendServerMail(item) {
        return __awaiter(this, void 0, void 0, function* () {
            // item.to.uuid 为版本号
            this.sysListMap.set(Number(item.to.uuid), item);
            console.log(':::系统发件成功');
            const sql = `INSERT INTO mail_sys (uuid, data)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE
        uuid = VALUES(uuid),
        data = VALUES(data)`;
            yield db_1.default.sql(sql, [item.to.uuid, JSON.stringify(item)]);
        });
    }
    send(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = this.listMap.get(item.to.uuid) || [];
            list.push(item);
            this.listMap.set(item.to.uuid, list);
            const sql = `INSERT INTO mail (uuid, data)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE
        uuid = VALUES(uuid),
        data = VALUES(data)`;
            yield db_1.default.sql(sql, [item.to.uuid, JSON.stringify(list)]);
        });
    }
    pull(uuid, sysDev) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = this.listMap.get(uuid) || [];
            this.listMap.delete(uuid);
            this.sysListMap.forEach((element, dev) => {
                if (dev > sysDev) {
                    try {
                        list.push(element);
                    }
                    catch (error) {
                        debugger;
                    }
                }
            });
            const sql = `DELETE FROM  mail WHERE uuid=?`;
            yield db_1.default.sql(sql, [uuid]);
            return list;
        });
    }
}
exports.default = new manage_mail();
