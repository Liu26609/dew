import { log } from "../..";
import message from "../message";

export default class extends message {
    constructor(ctx: any) {
        log.info('[onebot-收到消息]', ctx.content)
        super(ctx, 'onebot')
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