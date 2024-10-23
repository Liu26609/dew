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
}
export default new APP();