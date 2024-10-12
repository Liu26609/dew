export enum matchRule {
    完全匹配,
    
}
interface actionCfg {
    key:string;
    match_rule:matchRule;
    path:string;
}
let cfg:actionCfg[] = [];
// work
cfg.push({
    key: '打包正式服',
    match_rule: matchRule.完全匹配,
    path:'work/打包正式服'
})
cfg.push({
    key: '前端打包测试服',
    match_rule: matchRule.完全匹配,
    path:'work/前端打包测试服'
})
cfg.push({
    key: 'all',
    match_rule: matchRule.完全匹配,
    path:'atAll'
})
cfg.push({
    key: '基础指令',
    match_rule: matchRule.完全匹配,
    path:'menu'
})
cfg.push({
    key: 'sys',
    match_rule: matchRule.完全匹配,
    path:'info'
})
cfg.push({
    key: '改名',
    match_rule: matchRule.完全匹配,
    path:'set/改名'
})
cfg.push({
    key: '属性',
    match_rule: matchRule.完全匹配,
    path:'我的属性'
})
export default cfg;