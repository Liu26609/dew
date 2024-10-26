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
exports._signData = void 0;
const db_1 = __importDefault(require("../../model/db/db"));
const node_cron_1 = __importDefault(require("node-cron"));
class _signData {
    constructor(data = {}) {
        this.last_signTime = 0;
        /**
         * 总共签到天数
         */
        this.sign_count = 0;
        /**
         * 连续签到天数
         */
        this.consecutive_sign_count = 0;
        this.todayRank = 0;
        this.id = '';
        this.id = data.id || this.id;
        this.last_signTime = data.last_signTime || this.last_signTime;
        this.sign_count = data.sign_count || this.sign_count;
        this.consecutive_sign_count = data.consecutive_sign_count || this.consecutive_sign_count; // Initialize new property
        this.todayRank = data.todayRank || this.todayRank;
    }
    check_sign() {
        const now = new Date();
        const lastSignDate = new Date(this.last_signTime);
        return this.isSameDay(now, lastSignDate);
    }
    sign() {
        const now = new Date();
        const lastSignDate = new Date(this.last_signTime);
        if (this.isSameDay(now, lastSignDate)) {
            return false;
        }
        if (this.isNextDay(now, lastSignDate)) {
            this.consecutive_sign_count++;
        }
        else {
            this.consecutive_sign_count = 1; // Reset if not consecutive
        }
        this.last_signTime = now.getTime();
        this.sign_count++;
        return true;
    }
    isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }
    isNextDay(date1, date2) {
        const nextDay = new Date(date2);
        nextDay.setDate(nextDay.getDate() + 1);
        return this.isSameDay(date1, nextDay);
    }
}
exports._signData = _signData;
class sign {
    constructor() {
        this.signMap = new Map();
        this.signList = [];
        // 每日凌晨将signList清空
        node_cron_1.default.schedule('0 0 * * *', () => {
            this.signList = [];
        });
    }
    get_signData(onlyid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.signMap.has(onlyid)) {
                return this.signMap.get(onlyid);
            }
            let data = yield db_1.default.find('sign', { id: onlyid });
            let cls = new _signData(data[0]);
            cls.id = onlyid;
            if (data.length == 0) {
                db_1.default.insert('sign', cls);
            }
            this.signMap.set(onlyid, cls);
            return cls;
        });
    }
    sign(onlyid) {
        return __awaiter(this, void 0, void 0, function* () {
            let cls = yield this.get_signData(onlyid);
            let jude = cls.check_sign();
            if (jude) {
                console.log('今日已经签到过了');
                return false;
            }
            cls.sign();
            this.signList.push(onlyid);
            cls.todayRank = this.signList.length;
            db_1.default.update('sign', { id: onlyid }, cls);
            return cls;
        });
    }
}
exports.default = new sign();
