import message from "../../../trigger/message"
import BaseApiServer from "../../../backendApi/apiServer"
import APP from "../../../APP";
import temp_img from "../../../temp/temp_img";
import { CFG } from "../../..";
let auto = false;
export default class {
    constructor(cls: message, ...data) {
        console.log('绑定信息', data)
        this.start(cls, false)
        if(!auto){
            const executeTask = async () => {
                auto = true;
                await this.start(cls, true);
            };

            const scheduleTask = () => {
                const now = new Date();
                const minutes = now.getMinutes();
                const seconds = now.getSeconds();
                const milliseconds = now.getMilliseconds();
                const delay = (CFG.预警定时 - (minutes % CFG.预警定时)) * 60 * 1000 - seconds * 1000 - milliseconds;

                setTimeout(() => {
                    console.log('开始执行预警任务');
                    executeTask();
                    setInterval(executeTask, 1000 * 60 * CFG.预警定时);
                }, delay);
            };

            scheduleTask();
        }
    }

    async start(cls: message, auto) {
        console.log(cls);
        let img = await temp_img.render_url(cls);
        let str = ``;
        let res =  await this.check_1();
        str += `${res}`;
        str += await this.check_2();
        str += await this.check_3();
        str += img;
        if(!auto){
            let 是否订阅 = APP.follow_list.has(cls.get_userId());
            cls.send_v1(`${str}<button text="预警检查" type="input">再来一次</button><button text="${是否订阅 ? '取消订阅' : '订阅预警'}" type="input">${是否订阅 ? '取消订阅' : '订阅预警'}</button>`)
        }else{
            APP.follow_list.forEach((value, key) => {
                value.send_v1(`${str}<button text="预警检查" type="input">再来一次</button>`)
            });
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
        let halfHourCount = 0;

        // Calculate the number of recharge entries within the last half hour
        for (let i = 0; i < res.data.list.length; i++) {
            const dataTime = res.data.list[i].updatedAt;
            const timeDifference = currentTime - dataTime;
            if (timeDifference <= 1800) {
                halfHourCount++;
            } else {
                break; // Since the list is ordered by time, we can stop once we find an entry older than 30 minutes
            }
        }

        let str = ``;

        // 最近30条充值记录已完成的状态比例低于30% status = 2
        let count = 0;
        // 充值成功金额
        let success_amount = 0;
        for (let i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].status == 2) {
                count++;
                success_amount += res.data.list[i].amount / 100;
            }
        }
        str += `<p>`;
        let rate = count / res.data.list.length;
        if (rate < 0.3 || halfHourCount < 10) {
            str += '🔴'
        } else {
            str += '🟢'
        }
        str += `近30分钟内充值总笔数${halfHourCount},充值成功率${(rate*100).toFixed(2)}%,充值成功金额${success_amount}`;
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
                if(res.data.list[i].souAmount){
                    wait_count += res.data.list[i].souAmount / 100;
                }
            }
            
        }
        if(count > 0){
            return `<p>🔴近100次提现待审核数量:${count}${wait_count > 0 ? `,待审核金额:${wait_count}元` : ''}</p>`
        }else{
            return `<p>🟢近100次提现无待审核</p>`
        }
    }
    // 统计最近30条验证码“已使用” 率
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
        if(rate > 0.5){
            return `<p>🟢近30条验证码使用率:${(rate * 100).toFixed(2)}%</p>`
        }else{
            return `<p>🔴近30条验证码使用率:${(rate * 100).toFixed(2)}%</p>`
        }
    }

}