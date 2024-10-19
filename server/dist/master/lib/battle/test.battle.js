"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test_battle = void 0;
const shareFace_1 = require("../../../shared/shareFace");
const common_1 = __importDefault(require("../common"));
const FACE_BODY_1 = require("../face/FACE_BODY");
const body_com_1 = require("../unity/base/body_com");
const unity_1 = require("../unity/unity");
const battle_1 = require("./battle");
class test_battle {
    constructor() {
    }
    create_unity() {
        let data = {};
        data.name = `测试单位${common_1.default.random(1000, 9999)}`;
        data.attList = [];
        data.attList.push(new body_com_1.body_bar({ name: '生命值', key: shareFace_1._att_key.生命值, max: 100, now: 100 }));
        data.attList.push(new body_com_1.att_val({ name: '攻击力', key: shareFace_1._att_key.物理攻击, val: 10 }));
        data.attList.push(new body_com_1.att_val({ name: '防御力', key: shareFace_1._att_key.物理防御, val: 10 }));
        data.sk_active = [];
        data.sk_active.push('普通攻击', '大招');
        return new unity_1.unity(data);
    }
    attack(a, b) {
        let bt = new battle_1.battle();
        bt.join(FACE_BODY_1.battle_group.主场, a);
        bt.join(FACE_BODY_1.battle_group.客场, b);
        bt.start();
    }
}
exports.test_battle = test_battle;
