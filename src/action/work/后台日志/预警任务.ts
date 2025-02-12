import message from "../../../trigger/message"
import BaseApiServer from "../../../backendApi/apiServer"
import APP from "../../../APP";
import temp_img from "../../../temp/temp_img";
import { CFG, log } from "../../..";
import { clearInterval } from "timers";
let auto = false;
export default class {
    // 定时
    lastSendTime: number = 0;
    constructor(cls: message, ...data) {
        console.log('绑定信息', data)
        if (data.length == 0) {
            this.start(cls, false)
        }
    }
    open_task(cls: message) {
        if (APP.scheduleTask) {
            // 移除
            // clearInterval(this.scheduleTask);
            // clearInterval(this.scheduleTask);
            // this.scheduleTask = null;
            return;
        }
        APP.scheduleTask = true;
        console.log(`预警任务 已开启`)
        const executeTask = async () => {
            setTimeout(() => {
                this.start(cls, true);
            }, 10000);
        };

        const scheduleTask = () => {
            const now = new Date();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const milliseconds = now.getMilliseconds();
            const delay = (CFG.预警定时 - (minutes % CFG.预警定时)) * 60 * 1000 - seconds * 1000 - milliseconds;
            console.log('delay:',delay / 1000)
            setTimeout(() => {
                log.info('[预警任务]', '开始执行预警任务', APP.follow_list.size);
                executeTask();
                setInterval(executeTask, 1000 * 60 * CFG.预警定时);
            }, delay);
        };
        scheduleTask();
    }
    async start(cls: message, auto) {
        if (Date.now() - this.lastSendTime < 100) {
            cls.send_v1(`预警任务太频繁`)
            return;
        }
        if (!APP.follow_list.has(cls.get_userId()) && !cls.jude_private() && !auto) {
            APP.follow_list.set(cls.get_userId(), cls);
            cls.send_v1(`预警任务 已订阅`)
        }
        this.open_task(cls)
        this.lastSendTime = Date.now();
        let str = ``;
        let res = await this.check_1();
        str += `${res}`;
        str += await this.check_2();
        str += await this.check_3();
        str += await this.check_4();
        if (!auto) {
            let 是否订阅 = APP.follow_list.has(cls.get_userId());
            cls.send_v1(`${str}<button text="预警检查" type="input">再来一次</button><button text="${是否订阅 ? '取消订阅' : '订阅预警'}" type="input">${是否订阅 ? '取消订阅' : '订阅预警'}</button>`)
            temp_img.render_url([cls]);
        } else {
            let fix = await APP.task_1();

            APP.follow_list.forEach((value, key) => {
                if (fix) {
                    value.send_v1(fix);
                }
                value.send_v1(`${str}<button text="预警检查" type="input">再来一次</button>`)
            });
            temp_img.render_url(Array.from(APP.follow_list.values()));
        }
    }
    // 1、最近半小时内没有充值订单
    async check_1() {
        let api = new BaseApiServer('/admin/v1/recharge/list')
        let res = await api.post({
            orderKey: "created_at",
            orderType: "desc",
            page: 1,
            pageSize: 100,
            searchInfo: {}
        })
        const currentTime = Math.floor(Date.now() / 1000);
        let 总笔数 = 0;
        let 成功金额 = 0;
        let 成功笔数 = 0;
        // Calculate the number of recharge entries within the last half hour
        for (let i = 0; i < res.data.list.length; i++) {
            const dataTime = res.data.list[i].updatedAt;
            const timeDifference = currentTime - dataTime;
            if (timeDifference <= 1800) {
                总笔数++;
                if (res.data.list[i].status == 2) {
                    成功笔数++;
                    成功金额 += res.data.list[i].amount / 100;
                }
            } else {
                break; // Since the list is ordered by time, we can stop once we find an entry older than 30 minutes
            }
        }
        let str = ``;
        str += `<p>`;
        let rate = 成功笔数 / 总笔数;
        if (rate < 0.3 || 总笔数 < 10) {
            str += '🔴'
        } else {
            str += '🟢'
        }
        let 成功率 = (rate * 100).toFixed(2);
        str += `近30分钟内充值总笔数${总笔数}(${成功率}%),成功${成功笔数}笔(金额${成功金额})`;
        str += `</p>`;
        return str
    }
    async check_2() {
        let api = new BaseApiServer('/admin/v1/withdraw/list')
        let res = await api.post({
            orderKey: "created_at",
            orderType: "desc",
            page: 1,
            pageSize: 100,
            searchInfo: {}
        })
        // 定时发送最近半小时内提现的待审核数量
        let count = 0;
        // 待审核提现 
        let wait_count = 0;
        for (let i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].status == 1) {
                count++;
                if (res.data.list[i].souAmount) {
                    wait_count += res.data.list[i].souAmount / 100;
                }
            }

        }
        if (count > 0) {
            return `<p>🔴近100次提现待审核数量:${count}${wait_count > 0 ? `,待审核金额:${wait_count}元` : ''}</p>`
        } else {
            return `<p>🟢近100次提现无待审核</p>`
        }
    }
    // 统计最近30条验证码"已使用" 率
    async check_3() {
        let api = new BaseApiServer('/admin/v1/sms/get_phonecodelist')
        let res = await api.post({
            page: 1,
            pageSize: 30,
            searchInfo: {}
        })
        let count = 0;
        for (let i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].status == 1) {
                count++;
            }
        }
        let rate = count / res.data.list.length;
        if (rate > 0.5) {
            return `<p>🟢近30条验证码使用率:${(rate * 100).toFixed(2)}%</p>`
        } else {
            return `<p>🔴近30条验证码使用率:${(rate * 100).toFixed(2)}%</p>`
        }
    }
    async check_4() {
        let api = new BaseApiServer('/admin/v1/user/list')
        let res = await api.post({
            isrecharge: 1,
            orderKey: "created_at",
            orderType: "desc",
            page: 1,
            pageSize: 100,
            searchInfo: {
                isrecharge: 1
            }
        })
        let list = res.data.list;
        // rechargeTimes 充值次数
        // withdrawTimes 提现次数
        // 统计 玩家复充率，提现率
        let 重充次数 = 0;
        let 复充人数 = 0;
        let 复充次数 = 0;
        let 提现次数 = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i].rechargeTimes > 1) {
                重充次数++;
                复充次数 += list[i].rechargeTimes;
                复充人数++;
            }
            if (list[i].withdrawTimes >= 1) {
                提现次数++;
            }
        }
        let 复充率 = (重充次数 / list.length * 100).toFixed(2);
        let 提现率 = (提现次数 / list.length * 100).toFixed(2);
        let 平均复充次数 = (复充次数 / 复充人数).toFixed(2);
        return `<p>🟢复充率:${复充率}%,提现率:${提现率}%,平均复充次数:${平均复充次数}</p>`
    }

}