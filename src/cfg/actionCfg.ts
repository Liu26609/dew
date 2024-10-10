export enum matchRule {
    完全匹配,
    
}
interface actionCfg {
    key:string;
    match_rule:matchRule;
    path:string;
}
let cfg:actionCfg[] = [];

cfg.push({
    key: 'all',
    match_rule: matchRule.完全匹配,
    path:'atAll'
})
cfg.push({
    key: 'menu',
    match_rule: matchRule.完全匹配,
    path:'menu'
})
cfg.push({
    key: 'sys',
    match_rule: matchRule.完全匹配,
    path:'info'
})
export default cfg;