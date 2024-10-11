import app, { xlsxCfgNames } from "../../../app";
import god from "../../../god";
import { baseCalss } from "../../../model/base/baseCalss";
import { player, wallet_key } from "../../../model/fight/body/player";
import { rank_type, taskKey } from "../../../shared/interface";
import { Tpl_Task, Tpl_gifts_default, template } from "../../../shared/master/MsgAction";

export class EverweekTask extends baseCalss {
    createTime: number = 0;
    list: { type: taskKey, v: number, now: number, desc?: string }[] = []
    end: boolean = false;
    gift_exp: number = 0;
    baseGift: number = 0;
    title: string = '每周任务';
    constructor() {
        super();
    }
    update(active: player) {
        this.end = false;
        this.createTime = Date.now();
        const cfg = app.getCfg(xlsxCfgNames.任务_每周)
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
            this.baseGift += item.baseGift * tag;
        }
        this.gift_exp = 100 * god.getServerCfgItem('leve_exp_base').b * 7;

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
                title: "每日任务完成✅",
                items: [],
            }
            tpl.items.push({ name: '💰金币', num: this.baseGift })
            tpl.items.push({ name: '⏳经验', num: this.gift_exp })
            acitve.addExp(this.gift_exp)
            acitve.wallet_change(wallet_key.gold, this.baseGift)
            acitve.log.add(rank_type.每周任务完成次数, 1)
            acitve.sendMsg(template.通用奖励, tpl)
        }
    }
    look(active: player) {
        let rewards: { name: string, num: number }[] = [];
        rewards.push({ name: '💰金币', num: this.baseGift })
        rewards.push({ name: '⏳经验', num: this.gift_exp })
        let tpl: Tpl_Task = {
            title: this.title,
            taskList: this.list,
            reward: rewards,
            end: this.end
        }
        active.sendMsg(template.通用任务, tpl)
    }
}