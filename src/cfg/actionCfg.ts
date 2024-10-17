export enum matchRule {
    完全匹配,
    正则匹配,
}
interface actionCfg {
    key:string;
    match_rule:matchRule;
    path:string;
}
let cfg:actionCfg[] = [];
// work
cfg.push({
    key: '逃跑',
    match_rule: matchRule.完全匹配,
    path:'battle/逃跑'
})
cfg.push({
    key: '^debug.*$',
    match_rule: matchRule.正则匹配,
    path:'debug/测试模式'
})
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
    key: '基础指令',
    match_rule: matchRule.完全匹配,
    path:'common/menu'
})
cfg.push({
    key: 'sys',
    match_rule: matchRule.完全匹配,
    path:'sys/info'
})
cfg.push({
    key: '改名',
    match_rule: matchRule.完全匹配,
    path:'player/info/改名'
})
cfg.push({
    key: '属性',
    match_rule: matchRule.完全匹配,
    path:'player/info/我的属性'
})
export default cfg;