class APP {
    bodySysCfg = new Map();
    constructor() {
    }
    setSysCfg(cfg) {
        const groups = cfg.cover.split('\n');
        let m = new Map();
        for (const group of groups) {
            const parts = group.split('as');
            let temp = parts[0];
            let rename = parts[1];
            m.set(temp, rename);
        }
        this.bodySysCfg.set(cfg.id, m);
    }
    getSysCover(s, k) {
        if (this.bodySysCfg.has(s)) {
            let m = this.bodySysCfg.get(s);
            if (m && m.has(k)) {
                return m.get(k);
            }
        }
        return k;
    }
}
export default new APP();
