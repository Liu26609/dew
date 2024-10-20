"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inherit = void 0;
const xlsxToJson_1 = __importDefault(require("../../../../model/xlsxToJson"));
const shareFace_1 = require("../../../../shared/shareFace");
const common_1 = __importDefault(require("../../common"));
const word_1 = __importDefault(require("../../word"));
class inherit {
    constructor(data) {
        this.id = '1';
        this.attList = [];
        if (data) {
            this.id = data.id;
            this.attList = data.attList;
        }
        if (this.attList.length == 0) {
            this.reset();
        }
    }
    get_info() {
        let list = xlsxToJson_1.default.cfg.get('血统表');
        let info = list.get(this.id);
        return info;
    }
    get_att(key) {
        for (let i = 0; i < this.attList.length; i++) {
            const att = this.attList[i];
            if (att.key == key) {
                return att.val;
            }
        }
        return 0;
    }
    reset(id) {
        let list = xlsxToJson_1.default.cfg.get('血统表');
        let info = {};
        if (id) {
            info = list.get(id);
        }
        else {
            // 随机一个
            let keys = [...list.keys()];
            let key = common_1.default.random(0, keys.length - 1);
            info = list.get(keys[key]);
            this.id = info.id;
            this.attList = word_1.default.att_import_cfg(info, [
                shareFace_1._att_key.生命值,
                shareFace_1._att_key.生命恢复,
                shareFace_1._att_key.魔法值,
                shareFace_1._att_key.魔法恢复,
                shareFace_1._att_key.物理攻击,
                shareFace_1._att_key.魔法攻击,
                shareFace_1._att_key.物理防御,
                shareFace_1._att_key.魔法防御,
                shareFace_1._att_key.技能急速,
                shareFace_1._att_key.物理暴击率,
                shareFace_1._att_key.魔法暴击率
            ], 0);
        }
    }
}
exports.inherit = inherit;
