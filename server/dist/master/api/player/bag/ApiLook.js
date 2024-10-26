"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bags_1 = require("../../../lib/unity/base/bags");
const PtlFace_1 = require("../../../../shared/PtlFace");
const SKILL_1 = require("../../../lib/skill/SKILL");
const xlsxToJson_1 = __importDefault(require("../../../../model/xlsxToJson"));
function default_1(call) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let p = call.req._player;
        let bag = p.bag;
        let item = bag.get_item(bags_1.bag_getType.index, call.req.idx - 1);
        if (!item) {
            call.error('没有这个物品');
            return;
        }
        // let list = xlsxToJson.cfg.get('装备模板表') as Map<string, any>;
        // let info = list.get(item.data.id)
        let temp;
        switch (item.type) {
            case PtlFace_1.Item_Type.装备:
                temp = {
                    name: item.name,
                    att: item.data.attList,
                    sys: item.data.sys,
                    tips: '还没有写描述功能哦'
                };
                break;
            case PtlFace_1.Item_Type.技能书:
                let skData = new SKILL_1.SKILL(item.data);
                let sk = {
                    name: skData.get_name(),
                    cd: skData.cd,
                    type: skData.type,
                    desc: skData.desc
                };
                temp = sk;
                break;
            case PtlFace_1.Item_Type.道具:
                let info = (_a = xlsxToJson_1.default.cfg.get('道具表')) === null || _a === void 0 ? void 0 : _a.get(item.name);
                temp = {
                    name: item.name,
                    desc: info.desc || '还没有写描述功能哦'
                };
                break;
            default:
                break;
        }
        call.succ({
            type: item.type,
            temp: temp
        });
    });
}
exports.default = default_1;
