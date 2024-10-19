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
const shareFace_1 = require("../../shared/shareFace");
const body_com_1 = require("../lib/unity/base/body_com");
const player_1 = require("../lib/unity/player");
class user {
    constructor() {
        this.userMap = new Map();
    }
    locaHas(onlyid) {
        return this.userMap.get(onlyid);
    }
    save(onlyid, create) {
        let data = Object.assign({}, this.userMap.get(onlyid));
        // 去掉全部带下划线的属性
        let sk_acitve = [];
        for (let i = 0; i < data.sk_active.length; i++) {
            const sk = data.sk_active[i];
            sk_acitve.push(sk.save());
        }
        data['sk_active'] = sk_acitve;
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (key.indexOf('_') == 0) {
                    delete data[key];
                }
            }
        }
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
        data.attList.push(new body_com_1.att_val({ name: '战斗力', key: shareFace_1._att_key.战斗力, val: 0 }));
        data.attList.push(new body_com_1.att_val({ name: '等级', key: shareFace_1._att_key.等级, val: 1, hide: true }));
        data.attList.push(new body_com_1.body_bar({ name: '生命值', key: shareFace_1._att_key.生命值, max: 100, now: 100 }));
        data.attList.push(new body_com_1.body_bar({ name: '魔法值', key: shareFace_1._att_key.魔法值, max: 100, now: 50 }));
        data.attList.push(new body_com_1.body_bar({ name: '经验值', key: shareFace_1._att_key.经验值, max: 100, now: 0 }));
        data.attList.push(new body_com_1.att_val({ name: '物理攻击', key: shareFace_1._att_key.物理攻击, val: 10 }));
        data.attList.push(new body_com_1.att_val({ name: '物理防御', key: shareFace_1._att_key.物理防御, val: 1 }));
        data.attList.push(new body_com_1.att_val({ name: '魔法攻击', key: shareFace_1._att_key.魔法攻击, val: 0 }));
        data.attList.push(new body_com_1.att_val({ name: '魔法防御', key: shareFace_1._att_key.魔法防御, val: 0 }));
        data.attList.push(new body_com_1.att_val({ name: '技能急速', key: shareFace_1._att_key.技能急速, val: 0 }));
        data.attList.push(new body_com_1.att_val({ name: '物理暴击率', key: shareFace_1._att_key.物理暴击率, val: 0 }));
        data.attList.push(new body_com_1.att_val({ name: '魔法暴击率', key: shareFace_1._att_key.魔法暴击率, val: 0 }));
        data.attList.push(new body_com_1.att_val({ name: '物理护盾', key: shareFace_1._att_key.物理护盾, val: 0 }));
        data.attList.push(new body_com_1.att_val({ name: '魔法护盾', key: shareFace_1._att_key.魔法护盾, val: 0 }));
        data.attList.push(new body_com_1.att_val({ name: '生命护盾', key: shareFace_1._att_key.生命护盾, val: 0 }));
        let u = new player_1.player(data);
        this.createFix(u);
        this.userMap.set(onlyid, u);
        console.log('创建用户:', onlyid);
        this.save(onlyid, true);
        return u;
    }
    createFix(p) {
        p.addSk_active('普通攻击');
    }
}
exports.default = new user();
