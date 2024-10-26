"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._att_key = exports.body_sys = exports.SKILL_type = void 0;
var SKILL_type;
(function (SKILL_type) {
    SKILL_type[SKILL_type["\u4E3B\u52A8\u6280\u80FD"] = 0] = "\u4E3B\u52A8\u6280\u80FD";
    SKILL_type[SKILL_type["\u88AB\u52A8\u6280\u80FD"] = 1] = "\u88AB\u52A8\u6280\u80FD";
})(SKILL_type = exports.SKILL_type || (exports.SKILL_type = {}));
var body_sys;
(function (body_sys) {
    body_sys["\u4FEE\u4ED9"] = "\u4FEE\u4ED9";
    // 
    body_sys["\u6597\u7F57"] = "\u6597\u7F57";
    // 百级魂师‌
    body_sys["\u9B54\u6CD5"] = "\u9B54\u6CD5";
    body_sys["\u79D1\u5E7B"] = "\u79D1\u5E7B";
    body_sys["\u7384\u5E7B"] = "\u7384\u5E7B";
    body_sys["\u706B\u5F71\u5FCD\u8005"] = "\u706B\u5F71\u5FCD\u8005";
    // 普通巫师、终极巫师
})(body_sys = exports.body_sys || (exports.body_sys = {}));
/**
 * 修仙系统允许装备 [法宝,本名法宝.]
 * 古代科技 [手枪]
 * 现代科技 [手枪]
 * 系统 + 装备类型
 *
 * 装备类型  修仙-法宝
 *
 * 角色: 修仙
 * 装备栏位 [法宝]
 * 如果没有 则随机一个位置装备 并且效果只生效 80% 不再附带技能
 */
var _att_key;
(function (_att_key) {
    _att_key["\u6218\u6597\u529B"] = "\u6218\u6597\u529B";
    _att_key["\u751F\u547D\u503C"] = "\u751F\u547D\u503C";
    _att_key["\u751F\u547D\u6062\u590D"] = "\u751F\u547D\u6062\u590D";
    _att_key["\u9B54\u6CD5\u503C"] = "\u9B54\u6CD5\u503C";
    _att_key["\u9B54\u6CD5\u6062\u590D"] = "\u9B54\u6CD5\u6062\u590D";
    _att_key["\u7B49\u7EA7"] = "\u7B49\u7EA7";
    _att_key["\u7ECF\u9A8C\u503C"] = "\u7ECF\u9A8C\u503C";
    _att_key["\u7269\u7406\u653B\u51FB"] = "\u7269\u7406\u653B\u51FB";
    _att_key["\u9B54\u6CD5\u653B\u51FB"] = "\u9B54\u6CD5\u653B\u51FB";
    _att_key["\u7269\u7406\u9632\u5FA1"] = "\u7269\u7406\u9632\u5FA1";
    _att_key["\u9B54\u6CD5\u9632\u5FA1"] = "\u9B54\u6CD5\u9632\u5FA1";
    _att_key["\u6280\u80FD\u6025\u901F"] = "\u6280\u80FD\u6025\u901F";
    _att_key["\u7269\u7406\u66B4\u51FB\u7387"] = "\u7269\u7406\u66B4\u51FB\u7387";
    _att_key["\u9B54\u6CD5\u66B4\u51FB\u7387"] = "\u9B54\u6CD5\u66B4\u51FB\u7387";
    _att_key["\u7269\u7406\u62A4\u76FE"] = "\u7269\u7406\u62A4\u76FE";
    _att_key["\u9B54\u6CD5\u62A4\u76FE"] = "\u9B54\u6CD5\u62A4\u76FE";
    _att_key["\u751F\u547D\u62A4\u76FE"] = "\u751F\u547D\u62A4\u76FE";
})(_att_key = exports._att_key || (exports._att_key = {}));
