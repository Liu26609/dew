"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inputManage_1 = __importDefault(require("../inputManage"));
/**
 * 多平台消息处理中间件
 */
class message {
    platform;
    temp = [];
    session;
    constructor(ctx, p) {
        this.session = ctx;
        this.platform = p || '未知平台';
        // setTimeout(() => { ET.fire(ET_K.input_message, this) }, 0);
    }
    clear() {
        this.temp = [];
    }
    At() {
        return '直接';
    }
    addLine(str) {
        this.temp.push({ type: 'text', data: str });
    }
    get_name() {
        return this.session.author.username;
    }
    get_botName() {
        return this.session.bot.user.name;
    }
    /**
     * @deprecated 暂不可用，qq 群无法群发
     */
    broadcast() {
        // tg cid telegram:-4517987094
        this.session.ctx.broadcast(['qq:C974BE5999420457F2E3F6D480ACA1C5'], '全体目光向我看齐', true);
    }
    /**
     * 等待用户的下一次输入
     * @returns
     */
    async wait_nextInput(t = 10) {
        inputManage_1.default.skip(this.get_userId(), true);
        let res = await this.session.prompt(t * 1000);
        inputManage_1.default.skip(this.get_userId(), false);
        if (!res)
            return undefined;
        return res;
    }
    get_userId() {
        return this.session.userId;
    }
    get_msgId() {
        return this.session.messageId;
    }
    get_content() {
        return this.session.content;
    }
    // 判断是否为私信
    jude_private() {
        return !!this.session.guildId;
    }
    send() {
        let str = '';
        for (let index = 0; index < this.temp.length; index++) {
            const element = this.temp[index];
            // 如果是最后一条数据则不加\n
            if (index === this.temp.length - 1) {
                str += element.data;
            }
            else {
                str += element.data + '\n';
            }
        }
        this.session.sendQueued(str);
        this.clear();
    }
}
exports.default = message;
