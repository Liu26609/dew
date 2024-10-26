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
const db_1 = __importDefault(require("../../model/db/db"));
const shareFace_1 = require("../../shared/protocols/shareFace");
const common_1 = __importDefault(require("../lib/common"));
const body_com_1 = require("../lib/unity/base/body_com");
const player_1 = require("../lib/unity/player");
const node_cron_1 = __importDefault(require("node-cron"));
class user {
    constructor() {
        this.userMap = new Map();
        node_cron_1.default.schedule('*/1 * * * *', this.checkOffLine.bind(this));
    }
    // node-cron定时每间隔5分钟遍历一次用户列表，将超过5分钟未活跃的用户移除
    checkOffLine() {
        const now = Date.now();
        this.userMap.forEach((user, key) => {
            if (now - user.lastActiveTime > 5 * 60 * 1000) { // 5 minutes in milliseconds
                this.offLine(user.id);
            }
        });
    }
    offLine(onlyid) {
        // TODO: 检查玩家是否还处于战斗中，如果是则不移除
        this.save(onlyid);
        console.log(`Removed inactive user: ${onlyid}`);
        this.userMap.delete(onlyid);
    }
    locaHas(onlyid) {
        return this.userMap.get(onlyid);
    }
    save(onlyid, create) {
        let data = common_1.default.sanitizeObject(this.userMap.get(onlyid));
        if (create) {
            db_1.default.update('user', { id: onlyid }, data);
        }
        else {
            db_1.default.insert('user', data);
        }
    }
    sqHas(onlyid) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield db_1.default.find('user', { id: onlyid });
            if (data.length == 0) {
                return undefined;
            }
            let p = new player_1.player(data[0]);
            this.userMap.set(onlyid, p);
            return p;
        });
    }
    create(onlyid) {
        let data = {};
        data.id = onlyid;
        data.attList = [];
        data.attList.push(new body_com_1.att_val({ key: shareFace_1._att_key.生命值, val: 0 }));
        data.attList.push(new body_com_1.att_val({ key: shareFace_1._att_key.魔法恢复, val: 0 }));
        data.attList.push(new body_com_1.att_val({ key: shareFace_1._att_key.生命恢复, val: 0 }));
        data.attList.push(new body_com_1.att_val({ key: shareFace_1._att_key.魔法值, val: 0 }));
        data.attList.push(new body_com_1.att_val({ key: shareFace_1._att_key.物理攻击, val: 10 }));
        data.attList.push(new body_com_1.att_val({ key: shareFace_1._att_key.物理防御, val: 1 }));
        data.attList.push(new body_com_1.att_val({ key: shareFace_1._att_key.魔法攻击, val: 0 }));
        data.attList.push(new body_com_1.att_val({ key: shareFace_1._att_key.魔法防御, val: 0 }));
        data.attList.push(new body_com_1.att_val({ key: shareFace_1._att_key.技能急速, val: 0 }));
        data.attList.push(new body_com_1.att_val({ key: shareFace_1._att_key.物理暴击率, val: 0 }));
        data.attList.push(new body_com_1.att_val({ key: shareFace_1._att_key.魔法暴击率, val: 0 }));
        data.attList.push(new body_com_1.att_val({ key: shareFace_1._att_key.物理护盾, val: 0 }));
        data.attList.push(new body_com_1.att_val({ key: shareFace_1._att_key.魔法护盾, val: 0 }));
        data.attList.push(new body_com_1.att_val({ key: shareFace_1._att_key.生命护盾, val: 0 }));
        let u = new player_1.player(data);
        this.createFix(u);
        this.userMap.set(onlyid, u);
        console.log('创建用户:', onlyid);
        this.save(onlyid, true);
        return u;
    }
    createFix(p) {
        p.addSk_active('普通攻击');
        p.addSk_auto('荆棘之甲');
    }
}
exports.default = new user();
