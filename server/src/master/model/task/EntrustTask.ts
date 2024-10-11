import app, { xlsxCfgNames } from "../../../app";
import god from "../../../god";
import { baseCalss } from "../../../model/base/baseCalss";
import { player, wallet_key } from "../../../model/fight/body/player";
import { rank_type, taskKey } from "../../../shared/interface";
import { Tpl_Task, Tpl_gifts_default, template } from "../../../shared/master/MsgAction";

export class EntrustTask extends baseCalss {
    title:string = '每日委托'
    id: string = app.v4();
    taskKey!: taskKey;
    gift_exp: number = 0;
    end: boolean = false;
    baseGift!: number;

    list: { type: taskKey, v: number, now: number,desc?:string }[] = []

    constructor() {
        super();
    }
    private restart(){
        this.end = false;
        this.list = [];
    }
    update(active: player){
        this.restart();

        const cfg = app.xlsxCfgMap.get(xlsxCfgNames.委托任务表) as Map<string, any>
        const list = [...cfg.values()];
        const idx = app.random(0, list.length - 1);
        const item = list[idx];
        let v = app.random(1,item.v)
        this.list.push({ type: item.taskKey, v: v, now: 0,desc:item.desc })

        this.baseGift = Math.ceil(item.baseGift * v);
        if(this.baseGift < 50){
            this.baseGift = 50;
        }
        this.gift_exp = this.baseGift * god.getServerCfgItem('leve_exp_base').b;
        this.taskKey = item.taskKey;
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
        if(this.end){
            let tpl:Tpl_gifts_default = {
                title: "委托任务",
                items: [],
            }

            tpl.items.push({name:'💰金币',num: this.baseGift})
            tpl.items.push({name:'⏳经验',num:this.gift_exp})
            acitve.addExp(this.gift_exp)
            acitve.wallet_change(wallet_key.gold, this.baseGift)
            acitve.log.add(rank_type.委托完成次数排行榜,1)
            acitve.sendMsg(template.通用奖励, tpl)
        }
    }
    // tick(k:taskKey,acitve:player){
    //     if (this.end) {
    //         return;
    //     }
    //     if (k == this.taskKey) {
    //         this.now += 1;
    //         if (this.now >= this.tag) {
    //             this.end = true;
    //             let giftNum = this.tag * this.baseGift;
    //             acitve.wallet_change(wallet_key.gold, giftNum)
    //             acitve.rankLog(rank_type.委托完成次数排行榜, acitve.log.add(rank_type.委托完成次数排行榜,1))
    //             acitve.sendMsg(template.default_none, `🎉恭喜你已完成【${this.title}】💰+${this.tag * this.baseGift}`)
    //         }
    //     }
    // }
    look(active: player) {
        let rewards: { name: string, num: number }[] = [];
        rewards.push({ name: '💰金币', num: this.baseGift })
        rewards.push({ name: '⏳经验', num: this.gift_exp })
        let tpl: Tpl_Task = {
            title: this.title,
            taskList: this.list,
            desc: "委托任务完成后可以使用道具重复刷新哦",
            reward: rewards,
            end: this.end
        }
        active.sendMsg(template.通用任务, tpl)
    }
}