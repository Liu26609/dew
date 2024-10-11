import app, { xlsxCfgNames } from "../../../app";
import god from "../../../god";
import { baseCalss } from "../../../model/base/baseCalss";
import { player, wallet_key } from "../../../model/fight/body/player";
import { rank_type, taskKey } from "../../../shared/interface"
import { Tpl_Task, Tpl_gifts_default, template } from "../../../shared/master/MsgAction";

export class NewbieTask extends baseCalss {
    createTime: number = 0;
    list: { type: taskKey, v: number, now: number, desc?: string }[] = []
    end: boolean = false;
    gift_exp: number = 0;
    baseGift: number = 0;
    title: string = '新手任务';
    constructor() {
        super();
    }
    private restart() {

    }
    update(active: player) {
        this.createTime = Date.now();
        const cfg = app.getCfg(xlsxCfgNames.任务_新手)
        const list = [...cfg.values()];
        this.list = [];
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            const tag = app.random(1, item.v);
            this.list.push({
                type: item.taskKey,
                v: tag,
                now: 0,
                desc: item.desc
            })
            this.baseGift += Math.ceil(item.baseGift * tag)*10000;
        }
        this.gift_exp = god.getServerCfgItem('leve_exp_base').b;

        return this;
    }
    tick(k: taskKey, acitve: player,val:number) {
        if (this.end) {
            return;
        }
        let allEnd = true;
        for (let index = 0; index < this.list.length; index++) {
            const element = this.list[index];
            if (element.now >= element.v) {
                continue;
            }
            if (k == element.type) {
                element.now += val;
            }

            if (element.now < element.v) {
                allEnd = false;
            }
        }
        this.end = allEnd;
        if (this.end) {
            let tpl: Tpl_gifts_default = {
                title: "新手任务",
                items: [],
            }
            tpl.items.push({ name: '✅新手任务已完成', num: 0 })
            tpl.items.push({ name: '💰金币', num: this.baseGift })
            tpl.items.push({ name: '⏳经验', num: this.gift_exp })
            acitve.addExp(this.gift_exp)
            acitve.wallet_change(wallet_key.gold, this.baseGift)
            acitve.sendMsg(template.通用奖励, tpl)

            let useTime = Math.ceil((Date.now() - this.createTime) / 1000);

            acitve.log.add(rank_type.新手任务完成耗时, useTime)
            let item_a = app.createCfgItem('prop-2', 100, '新手任务·完成赠送')
            item_a.cont_change(9)
            let item_b = app.createCfgItem('prop-5', 100, '新手任务·完成赠送')
            item_b.cont_change(9)
            let item_c = app.createCfgItem('prop-12', 100, '新手任务·完成赠送')
            item_c.cont_change(9)
            let item_d = app.createCfgItem('prop-13', 100, '新手任务·完成赠送')
            item_d.cont_change(9)
            let item_e = app.createCfgItem('prop-1', 100, '新手任务·完成赠送')
            item_e.cont_change(300)
            god.send({ uuid: '', name: '主神' }, acitve.uuid, '欢迎你.新的轮回者', `很高兴，你能完成新手任务用时${useTime}秒,你的完成耗时将永久记录在[排行榜](用时越久排行榜奖励越高),以下是你的额外奖励~`,
                [
                    // 改名卡
                    app.createCfgItem('prop-6', 100, '新手任务·完成赠送'),
                    // 天赋证明
                    item_a, item_b, item_c, item_e
                ]);
        }
    }
    look(active: player) {
        let rewards: { name: string, num: number }[] = [];
        rewards.push({ name: '💰金币', num: this.baseGift })
        rewards.push({ name: '⏳经验', num: this.gift_exp })
        let tpl: Tpl_Task = {
            title: this.title,
            taskList: this.list,
            desc: "这是主神空间为你布置的新手任务,完成此任务能够让你快速了解游戏基础操作",
            reward: rewards,
            end: this.end
        }
        active.sendMsg(template.通用任务, tpl)
    }
}