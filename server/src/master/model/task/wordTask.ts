import app from "../../../app"
import god from "../../../god"
import { rank_type } from "../../../shared/interface"
import { Tpl_gifts_default, template } from "../../../shared/master/MsgAction"
import { baseCalss } from "../../../model/base/baseCalss"
import { baseBody } from "../../../model/fight/body/baseBody"
import { enemy } from "../../../model/fight/body/enemy"
import { player, wallet_key } from "../../../model/fight/body/player"
import manage_word from "../manage/manage_word"
import { wordCfg } from "../../../model/word/word"

export interface wordTaskCfg {
    /**
     * 目标值
     */
    v: number
    /**
     * 当前值
     */
    now?: number
    taskGold: number
    wordLeve: number
}

export class wordTask extends baseCalss {
    data: wordTaskCfg
    end: boolean = false;
    private _parent: player;
    private create_time: number = Date.now();
    lastSentTime: number = 0;
    private _doneCall: any = undefined;
    constructor(cfg: wordTaskCfg, _parent: player) {
        super()
        this.data = JSON.parse(JSON.stringify(cfg));
        if (!this.data.now) {
            this.data.now = 0;
        }
        this._parent = _parent;
    }
    private async changePgs(c: number) {
        (this.data.now as number) += c;
        let now = this.data.now as number;

        if (now < this.data.v) {
            return;
        }
        this.data.now = this.data.v;
        this.end = true;

        let user = this._parent;

        const currentTime = Date.now();

        if (!this.lastSentTime && currentTime - this.lastSentTime >= 5000) {
   
            await user.sendMsg(template.default, `你已完成世界任务,发送[完成任务]`);
            this.lastSentTime = currentTime;
        }
    }
    onLisentEnd(call: any) {
        this._doneCall = call;
    }
    async done() {
        let user = this._parent;
        // let lastWord = user.getPosition().getWord()
        // const lastword_id = lastWord.id
        user.wallet_change(wallet_key.gold, this.data.taskGold);
        user.addExp(this.data.wordLeve * god.getServerCfgItem('leve_exp_base').b);
        let equip = app.createCfgItem('equip',this.data.wordLeve,`世界任务`)
        let skill =app.createCfgItem('skill',this.data.wordLeve,`世界任务`)
        user.getBag().add(equip)
        user.getBag().add(skill)
        let tpl: Tpl_gifts_default = {
            title: "世界任务",
            items: [],
            exp: this.data.wordLeve * god.getServerCfgItem('leve_exp_base').b,
            gold: this.data.taskGold
        }
        tpl.items.push({ name: '您已完成世界任务,即将返回主神空间.', num: 0 })
        tpl.items.push({ name: '💰金币', num: this.data.taskGold })
        tpl.items.push({ name: '⏳经验', num: this.data.wordLeve * god.getServerCfgItem('leve_exp_base').b })
        tpl.items.push({ name: equip.getStyleName(), num: 1 })
        tpl.items.push({ name: skill.getStyleName(), num: 1 })
        user.sendMsg(template.通用奖励, tpl)
        let res = await manage_word.transfer(user, '1')
        await user.sendMsg(template.default, res.msg);
        if (res.jude) {
            if (this._doneCall) {
                this._doneCall(Math.ceil((Date.now() - this.create_time) / 1000));
            }
            user.callApi('word/Position', {})
        }

    }
    /**
 * 击杀敌人
 */
    onKillEnemy(user: player, body: enemy) {
        user.log.add(rank_type.击杀怪物数量, 1)
        this.changePgs(app.random(50, 100) / 100);
    }
    /**
     * 捕捉
     */
    onCatchPet(body: baseBody, tag: enemy) {
        this.changePgs(app.random(10, 50) / 100);
    }
    onGetProp() {

    }
    onMove() {
        this.changePgs(app.random(1, 50) / 100);
    }
    onOpenBox(body: player) {
        body.log.add(rank_type.击杀怪物数量, 1)
        this.changePgs(app.random(5, 50) / 100);
    }
    /**
     * 砍树
     */
    onChopping(){
        this.changePgs(app.random(1, 20) / 100);
    }
    /**
     * 钓鱼
     */
    onFishing(){
        this.changePgs(app.random(1, 10) / 100);
    }
    notice(desc?: string) {
        let tpl = ``;
        tpl += `【世界任务】\n`
        if (desc) {
            tpl += `📄${desc}`;
        }
        tpl += `💡击杀敌人,玩家,捕捉,移动,击败boss,开宝箱...等可增加任务进度\n`;
        tpl += `💰金币+${this.data.taskGold}\n`;
        tpl += `⏳经验+${this.data.wordLeve * god.getServerCfgItem('leve_exp_base').b}\n`;
        tpl += `⚔️随机装备⭐️${this.data.wordLeve}\n`;
        tpl += `📘随机技能⭐️${this.data.wordLeve}\n`;
        tpl += `✅进度:${Math.floor(this.data.now || 0)}/${this.data.v}\n`;
        this._parent.sendMsg(template.default_none, tpl);

    }
}