"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buff_keys = exports.SKILL_rang = exports.SKILL_eff_type_恢复类 = exports.SKILL_eff_type_伤害类 = exports.SKILL_eff_type_增益类 = exports.SKILL_eff_path = exports.SKILL_eff_type = exports.SKILL_target = exports.SKILL_type = void 0;
var SKILL_type;
(function (SKILL_type) {
    SKILL_type[SKILL_type["\u4E3B\u52A8\u6280\u80FD"] = 0] = "\u4E3B\u52A8\u6280\u80FD";
    SKILL_type[SKILL_type["\u88AB\u52A8\u6280\u80FD"] = 1] = "\u88AB\u52A8\u6280\u80FD";
})(SKILL_type = exports.SKILL_type || (exports.SKILL_type = {}));
var SKILL_target;
(function (SKILL_target) {
    SKILL_target[SKILL_target["\u654C\u4EBA"] = 0] = "\u654C\u4EBA";
    // 敌人_死亡,
    // 敌人_召唤,
    // 敌人_宠物,
    SKILL_target[SKILL_target["\u81EA\u5DF1"] = 1] = "\u81EA\u5DF1";
    // 自己_召唤,
    // 自己_宠物,
    // 队友,
    // 队友_死亡,
    // 队友_召唤,
    // 队友_宠物
})(SKILL_target = exports.SKILL_target || (exports.SKILL_target = {}));
/**
 * 效果分类
 */
var SKILL_eff_type;
(function (SKILL_eff_type) {
    SKILL_eff_type["\u4F24\u5BB3\u7C7B"] = "\u4F24\u5BB3\u7C7B";
    SKILL_eff_type["\u6062\u590D\u7C7B"] = "\u6062\u590D\u7C7B";
    SKILL_eff_type["\u53EC\u5524\u7C7B"] = "\u53EC\u5524\u7C7B";
    SKILL_eff_type["\u589E\u76CA\u7C7B"] = "\u589E\u76CA\u7C7B";
    SKILL_eff_type["\u51CF\u76CA\u7C7B"] = "\u589E\u76CA\u7C7B";
    SKILL_eff_type["\u63A7\u5236\u7C7B"] = "\u63A7\u5236\u7C7B";
})(SKILL_eff_type = exports.SKILL_eff_type || (exports.SKILL_eff_type = {}));
var SKILL_eff_path;
(function (SKILL_eff_path) {
    SKILL_eff_path["\u52A8\u4F5C"] = "action";
    SKILL_eff_path["buff"] = "buff";
})(SKILL_eff_path = exports.SKILL_eff_path || (exports.SKILL_eff_path = {}));
var SKILL_eff_type_增益类;
(function (SKILL_eff_type_增益类) {
    SKILL_eff_type_增益类["\u9644\u52A0\u66B4\u51FB"] = "\u9644\u52A0\u66B4\u51FB";
    SKILL_eff_type_增益类["\u9B54\u6CD5\u4F24\u5BB3"] = "\u9B54\u6CD5\u4F24\u5BB3";
    SKILL_eff_type_增益类["\u771F\u5B9E\u4F24\u5BB3"] = "\u771F\u5B9E\u4F24\u5BB3";
})(SKILL_eff_type_增益类 = exports.SKILL_eff_type_增益类 || (exports.SKILL_eff_type_增益类 = {}));
var SKILL_eff_type_伤害类;
(function (SKILL_eff_type_伤害类) {
    SKILL_eff_type_伤害类["\u7269\u7406\u4F24\u5BB3"] = "\u7269\u7406\u4F24\u5BB3";
    SKILL_eff_type_伤害类["\u9B54\u6CD5\u4F24\u5BB3"] = "\u9B54\u6CD5\u4F24\u5BB3";
    SKILL_eff_type_伤害类["\u771F\u5B9E\u4F24\u5BB3"] = "\u771F\u5B9E\u4F24\u5BB3";
})(SKILL_eff_type_伤害类 = exports.SKILL_eff_type_伤害类 || (exports.SKILL_eff_type_伤害类 = {}));
var SKILL_eff_type_恢复类;
(function (SKILL_eff_type_恢复类) {
    SKILL_eff_type_恢复类[SKILL_eff_type_恢复类["\u751F\u547D\u6062\u590D"] = 0] = "\u751F\u547D\u6062\u590D";
    SKILL_eff_type_恢复类[SKILL_eff_type_恢复类["\u9B54\u6CD5\u6062\u590D"] = 1] = "\u9B54\u6CD5\u6062\u590D";
})(SKILL_eff_type_恢复类 = exports.SKILL_eff_type_恢复类 || (exports.SKILL_eff_type_恢复类 = {}));
var SKILL_rang;
(function (SKILL_rang) {
    SKILL_rang[SKILL_rang["\u5355\u4F53\u4F24\u5BB3"] = 0] = "\u5355\u4F53\u4F24\u5BB3";
    SKILL_rang[SKILL_rang["\u8303\u56F4\u4F24\u5BB3"] = 1] = "\u8303\u56F4\u4F24\u5BB3";
})(SKILL_rang = exports.SKILL_rang || (exports.SKILL_rang = {}));
var Buff_keys;
(function (Buff_keys) {
    Buff_keys["\u65E0\u654C"] = "\u65E0\u654C";
    Buff_keys["\u6C89\u9ED8"] = "\u6C89\u9ED8";
    Buff_keys["\u6655\u7729"] = "\u6655\u7729";
    Buff_keys["\u7729\u6655"] = "\u7729\u6655";
    Buff_keys["\u7981\u9522"] = "\u7981\u9522";
    Buff_keys["\u51FB\u98DE"] = "\u51FB\u98DE";
    Buff_keys["\u51FB\u9000"] = "\u51FB\u9000";
    Buff_keys["\u51FB\u5012"] = "\u51FB\u5012";
    Buff_keys["\u51B0\u51BB"] = "\u51B0\u51BB";
    Buff_keys["\u71C3\u70E7"] = "\u71C3\u70E7";
    Buff_keys["\u6D41\u8840"] = "\u6D41\u8840";
    Buff_keys["\u4E2D\u6BD2"] = "\u4E2D\u6BD2";
    Buff_keys["\u707C\u70E7"] = "\u707C\u70E7";
    Buff_keys["\u51CF\u901F"] = "\u51CF\u901F";
    Buff_keys["\u52A0\u901F"] = "\u52A0\u901F";
    Buff_keys["\u9690\u8EAB"] = "\u9690\u8EAB";
    Buff_keys["\u9738\u4F53"] = "\u9738\u4F53";
    Buff_keys["\u9B54\u514D"] = "\u9B54\u514D";
    Buff_keys["\u7269\u514D"] = "\u7269\u514D";
})(Buff_keys = exports.Buff_keys || (exports.Buff_keys = {}));
