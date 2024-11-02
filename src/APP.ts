import emojiCfg from "./cfg/emojiCfg";
import { logger } from "./index_bot";
import server from "./server";

class APP {
    bodySysCfg: Map<string, Map<string, string>> = new Map();
    constructor() {

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
        }
        return k
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
    getIcon(name:string){
        if(emojiCfg[name]){
            return emojiCfg[name]
        }
        return '⚠️'
    }
    /**
     * 计算剩余时间
     */
    countdown(seconds: number) {
        seconds = seconds /1000
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