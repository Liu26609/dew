export declare enum matchRule {
    完全匹配 = 0,
    正则匹配 = 1
}
interface actionCfg {
    key: string;
    match_rule: matchRule;
    path: string;
}
declare let cfg: actionCfg[];
export default cfg;
