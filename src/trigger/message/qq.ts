import { log } from "../..";
import message from "../message";

export default class extends message {
    constructor(ctx: any) {
        ctx.content = ctx.content.replace(/<[^>]*>/gi, '').trim();
        ctx.content = ctx.content.replace('/', '')
        log.info('[qq-收到消息]', ctx.content)
        super(ctx, 'qq')
    }
    send(): void {
        super.send()
    }
    get_name() {
        return '匿名用户';
    }
    At(): string {
        return '@' + this.get_name();
    }

}