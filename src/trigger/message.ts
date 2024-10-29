import inputManage from "../inputManage";
import ET, { ET_K } from "../lib/ET";
import { temp_card } from "../temp/temp_text";

/**
 * 多平台消息处理中间件
 */
export default class message {
    platform: string;
    temp: any[] = [];
    session: any;
    constructor(ctx: any, p?: string) {
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
    addLine(str: string) {
        this.temp.push({ type: 'text', data: str })
    }
    get_name() {
        return this.session.author.username
    }
    get_botName(): string {
        return this.session.bot.user.name
    }
    /**
     * @deprecated 暂不可用，qq 群无法群发
     */
    broadcast() {
        // tg cid telegram:-4517987094
        this.session.ctx.broadcast(['qq:C974BE5999420457F2E3F6D480ACA1C5'], '全体目光向我看齐', true)
    }
    /**
     * 等待用户的下一次输入
     * @returns 
     */
    async wait_nextInput(t: number = 10) {
        inputManage.skip(this.get_userId(), true)
        let res = await this.session.prompt(t * 1000)
        inputManage.skip(this.get_userId(), false)
        if (!res) return undefined;
        return res
    }
    get_userId() {
        return this.session.userId
    }
    get_msgId() {
        return this.session.messageId
    }
    get_content() {
        return this.session.content
    }
    // 判断是否为私信
    jude_private() {
        return !!this.session.guildId
    }
    send(delaytime?: number) {
        let str = '';
        if (this.platform === 'qq') {
            str += '✨来消息啦✨\n';
        }
        for (let index = 0; index < this.temp.length; index++) {
            const element = this.temp[index];
            // 如果是最后一条数据则不加\n
            if (index === this.temp.length - 1) {
                str += element.data;
            } else {
                str += element.data + '\n';
            }
        }
        str += '\n文字排版dev 0.01'
        this.session.sendQueued(str, delaytime ? delaytime * 1000 : 0.2)
        this.clear();
    }
    send_v1(temp: string, delaytime?: number) {
        let str = '';
        if (this.platform === 'qq') {
            str += '.\n';
        }
        str += temp;
        this.session.sendQueued(str, delaytime || 0.2)
    }
    send_v2(temp: temp_card, delaytime?: number) {
        let str = '';
        if (this.platform === 'qq') {
            str += '✨来消息啦✨\n';
        }
        str += temp.text();
        this.session.sendQueued(str, delaytime || 0.2)
    }
}