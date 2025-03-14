import path from "path";
import emojiCfg from "./cfg/emojiCfg";
import { logger } from "./index_bot";
import inputManage from "./inputManage";
import server from "./server";
import { _att_key } from "./shared/master/shareFace";
import common from "./lib/common";
import { CFG, log } from ".";
import BaseApiServer from "./backendApi/apiServer";

class APP {
    follow_list: Map<string, any> = new Map();
    bodySysCfg: Map<string, Map<string, string>> = new Map();
    ctx: any;
    game_stock: boolean = false;
    scheduleTask = false;
    constructor() {

    }
    init(ctx: any) {
        this.ctx = ctx;
    }
    addCommon(cfg: any) {
        const element = cfg;
        let cls = this.ctx.command(element.key, `💡${element.key_tips}`)
        // option 不适合本机器人
        // if (element.option) {
        // cls.option('改名', '<val:string>')
        // }
        if (element.tips.length > 0) {
            cls.usage(`✦─✧📜指令介绍✧─✦\n「${element.tips}」`)
        }
        if (element.example.length > 0) {
            // cls.example(`✨指令有空格哦✨`)
            for (let i = 0; i < element.example.length; i++) {
                const example = element.example[i];
                let icon = '①②③④⑤⑥⑦⑧⑨⑩'
                cls.example(`${icon[i]}${example}`)
            }
        }
        cls.action(async (_: any, ag: any) => {
            let msg = inputManage.get_msg(_.session.messageId)
            if (!msg) {
                return
            }
            //   if(inputManage.wait_inputskipMap.has(msg.get_userId())){
            //     console.log('skip')
            //     return;
            //   }

            const classPath = path.resolve(__dirname, `./action/${element.path}`);
            common.importClass(classPath, [msg, ..._.args])
        })
    }
    async task_1() {
        if (!this.game_stock) {
            return;
        }
        let api = new BaseApiServer('/admin/v1/data/total')
        let time = Math.ceil(Date.now() / 1000)
        let res = await api.post({
            endTime: time,
            startTime: time
        })
        let 充提差 = res.data.difRAndW || 0;
        let 充值金额 = res.data.rechargeSum || 0;
        let 返奖率 = res.data.gameReward * 100 || 0;
        let ctl = new BaseApiServer('/admin/v1/game_stock')
        let stock = await ctl.post({
            gameCode: "control"
        })
        let 库存1 = stock.data.stocks[0] || 0;
        let 可送金额 = 0;
        let 需补充值 = 0;

        let 库存1_修正值 = 0;
        console.log('充提差', 充提差, 'CFG.库存逻辑:', CFG.库存逻辑);
        eval(CFG.库存逻辑)
        let text = `
可送金额:${(可送金额 / 100).toFixed(2)}
需补充值:${(需补充值 / 100).toFixed(2)}
充值金额:${(充值金额 / 100).toFixed(2)}
返奖率:${返奖率.toFixed(2)}
库存1:${(库存1 / 100).toFixed(2)}
库存修正:库存1:${(库存1_修正值 / 100).toFixed(2)}`

        log.info(`
可送金额:${(可送金额 / 100).toFixed(2)}
需补充值:${(需补充值 / 100).toFixed(2)}
充值金额:${(充值金额 / 100).toFixed(2)}
返奖率:${返奖率.toFixed(2)}
库存1:${(库存1 / 100).toFixed(2)}
库存修正:库存1:${(库存1_修正值 / 100).toFixed(2)}`);

        if (库存1_修正值 != 0 && 返奖率 != 0 && 充值金额 != 0) {
            let change = new BaseApiServer('/admin/v1/game_stock/update')
            let update = await change.post({
                changeType: "stock",
                gameCode: "control",
                index: 0,
                value: 库存1_修正值
            })
            console.log('update:', update)
        }
        return text
    }
    setSysCfg(cfg: any) {
        const groups = cfg.cover.split('\n');
        let m = new Map();
        for (const group of groups) {
            const parts = group.split('as');
            let temp = parts[0]
            let rename = parts[1]
            m.set(temp, rename)
        }
        this.bodySysCfg.set(cfg.id, m)
    }
    getSysCover(s: string, k: string) {
        if (this.bodySysCfg.has(s)) {
            let m = this.bodySysCfg.get(s)
            if (m && m.has(k)) {
                return m.get(k)
            }
            return k
        }
        return k
    }
    getAttIcon(k: _att_key) {
        let icon = ''
        switch (k) {
            case _att_key.生命值:
                icon = '❤️'
                break;
            case _att_key.物理攻击:
                icon = '🗡️'
                break;
            case _att_key.物理防御:
                icon = '🛡️'
                break;
            case _att_key.魔法攻击:
                icon = '🔮'
                break;
            case _att_key.魔法防御:
                icon = '🔰'
                break;
            case _att_key.物理暴击率:
                icon = '💥'
                break;
            case _att_key.魔法暴击率:
                icon = '💥'
                break;
            case _att_key.魔法值:
                icon = '🔮'
                break;
            case _att_key.战斗力:
                icon = '🔥'
                break;
            case _att_key.经验值:
                icon = '⏳'
                break;
            case _att_key.生命恢复:
                icon = '🌿'
                break;
            case _att_key.魔法恢复:
                icon = '🌿'
                break;
            default:
                icon = '❓'
                break;
        }
        return icon
    }
    async checkSys(s: string) {
        if (this.bodySysCfg.has(s)) {
            return true
        }
        let req_cfg = await server.api('common/GetBodySysCfg', { key: s })
        if (req_cfg) {
            this.setSysCfg(req_cfg.cfg)
            return true
        }
        logger.error('未找到体系配置:', s)
    }
    /**
     * 将数字转为中文
     * 1000 -> 1千
     * 10000 -> 1万
     * 100000000 -> 1亿
     * @param number 
     * @returns 
     */
    numberToChinese(number: number): string {
        number = Math.floor(number * 100) / 100;
        const chineseUnits = ['', '千', '万', '亿'];
        const unitValues = [1, 1000, 10000, 100000000];
        let result = '';

        for (let i = unitValues.length - 1; i >= 0; i--) {
            if (number >= unitValues[i]) {
                const unitValue = Math.floor(number / unitValues[i]);
                number %= unitValues[i];
                result += unitValue + chineseUnits[i];
            }
        }

        return result || '0';
    }
    getIcon(name: string) {
        if (emojiCfg[name]) {
            return emojiCfg[name]
        }
        return '⚠️'
    }
    /**
     * 计算剩余时间
     */
    countdown(seconds: number) {
        seconds = seconds / 1000
        const days = Math.floor(seconds / (24 * 3600));
        const hours = Math.floor((seconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        let countdown = '';
        if (days > 0) countdown += `${days}天`;
        if (hours > 0 || days > 0) countdown += `${hours}小时`;
        if (minutes > 0 || hours > 0 || days > 0) countdown += `${minutes}分`;
        countdown += `${remainingSeconds}秒`;
        return countdown;
    }
}
export default new APP();