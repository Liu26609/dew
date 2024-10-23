"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APP_1 = __importDefault(require("../APP"));
const PtlFace_1 = require("../shared/PtlFace");
class temp_text {
    constructor() {
    }
    /**
     * 背包列表展示
     */
    bag_list(data, cls) {
        if (!data)
            return;
        let temp = `背包信息\n`;
        for (let i = 0; i < data.list.length; i++) {
            const element = data.list[i];
            temp += `[${element.idx + 1}]┃${element.name}X${element.cont}\n`;
        }
        if (data.list.length == 0) {
            temp += `你的背包里什么东西都没有呢~`;
        }
        cls.send_v1(temp);
    }
    /**
     * 道具查看
     */
    async prop_look(data, cls) {
        if (!data || !data.temp) {
            cls.send_v1('物品查看出错.请上报日志');
            return;
        }
        let text = '';
        switch (data.type) {
            case PtlFace_1.Item_Type.装备:
                text = await this.temp_prop_equip(data.temp);
                break;
            case PtlFace_1.Item_Type.技能书:
                text = await this.temp_prop_skill(data.temp);
                break;
            default:
                break;
        }
        cls.send_v1(text);
    }
    async temp_prop_equip(data) {
        await APP_1.default.checkSys(data.sys);
        let text = '';
        text += `装备名称：${data.name}\n`;
        text += `装备描述：${data.tips}\n`;
        for (let i = 0; i < data.att.length; i++) {
            const element = data.att[i];
            text += `┃${APP_1.default.getSysCover(data.sys, element.name)}:${element.val}\n`;
        }
        return text;
    }
    async temp_prop_skill(data) {
        let text = '';
        text += '📜技能详情\n';
        text += `名称: ${data.name}\n`;
        text += `冷却: ${data.cd}回合\n`;
        text += `类型: ${data.type === 0 ? '主动技能' : '被动技能'}\n`;
        text += `技能描述: ${data.desc}\n`;
        return text;
    }
}
exports.default = new temp_text();
