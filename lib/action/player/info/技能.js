"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../../server"));
const PtlFace_1 = require("../../../shared/PtlFace");
const temp_text_1 = __importDefault(require("../../../temp/temp_text"));
class default_1 {
    constructor(cls, ...data) {
        console.log('技能', data);
        this.start(cls, ...data);
    }
    async start(cls, ...data) {
        if (!data || data.length == 0) {
            this.look(cls);
        }
        else if (data.length >= 1) {
            let actionKey = data[0];
            let skill_id = data[1];
            console.log('actionKey', actionKey);
            switch (actionKey) {
                case '查看':
                    this.look_index(cls, skill_id);
                    break;
                case '遗忘':
                    this.rm(cls, skill_id);
                    break;
                case '改名':
                    this.rename(cls, skill_id, data[2]);
                    break;
                default:
                    cls.addLine('你好像输入了一个无效指令呢~[指令 + hp]可查看帮助');
                    cls.send();
                    break;
            }
        }
    }
    async rename(cls, idx, name) {
        let req = await server_1.default.api('player/skill/Rename', { idx: idx, rename: name }, cls);
        if (!req)
            return;
        cls.addLine('技能改名成功');
        cls.send();
    }
    async rm(cls, idx) {
        let req = await server_1.default.api('player/skill/Rm', { idx: idx }, cls);
        if (!req)
            return;
        cls.addLine('技能遗忘成功');
        cls.send();
    }
    async look_index(cls, idx) {
        let req = await server_1.default.api('player/skill/Look', {
            idx: idx
        }, cls);
        temp_text_1.default.prop_look({ type: PtlFace_1.Item_Type.技能书, temp: req }, cls);
    }
    async look(cls) {
        console.log('查看全部技能');
        let req = await server_1.default.api('player/skill/List', {}, cls);
        if (!req)
            return;
        let list = req.list;
        let temp = '';
        temp += '📜技能列表\n';
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            temp += `${i + 1}.${element.name}\n`;
        }
        cls.addLine(temp);
        cls.send();
    }
}
exports.default = default_1;
