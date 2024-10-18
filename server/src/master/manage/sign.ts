import db from "../../model/db/db";
import cron from 'node-cron';
export class _signData {
    last_signTime = 0;
    /**
     * 总共签到天数
     */
    sign_count = 0;
    /**
     * 连续签到天数
     */
    consecutive_sign_count = 0;
    todayRank = 0;
    id:string = '';
    constructor(data: any = {}) {
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
        } else {
            this.consecutive_sign_count = 1; // Reset if not consecutive
        }
        this.last_signTime = now.getTime();
        this.sign_count++;
        return true;
    }

    private isSameDay(date1: Date, date2: Date): boolean {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }

    private isNextDay(date1: Date, date2: Date): boolean {
        const nextDay = new Date(date2);
        nextDay.setDate(nextDay.getDate() + 1);
        return this.isSameDay(date1, nextDay);
    }
}

class sign {
    signMap: Map<string, _signData> = new Map();
    signList:string[] = [];
    constructor() {
        // 每日凌晨将signList清空
        cron.schedule('0 0 * * *', () => {
            this.signList = [];
        });
    }
    async get_signData(onlyid: string) {
        if (this.signMap.has(onlyid)) {
            return this.signMap.get(onlyid) as _signData;
        }
        let data = await db.find('sign', { id: onlyid })
        let cls = new _signData(data[0]);
        cls.id = onlyid;
        if(data.length == 0){
            db.insert('sign', cls );
        }
        this.signMap.set(onlyid, cls);
        return cls;
    }
    async sign(onlyid: string) {
        let cls = await this.get_signData(onlyid);
        let jude = cls.check_sign();
        if (jude) {
            console.log('今日已经签到过了');
            return false;
        }
        cls.sign();
        this.signList.push(onlyid);
        cls.todayRank = this.signList.length;
        db.update('sign', { id: onlyid }, cls);
        return cls;
    }
}
export default new sign();