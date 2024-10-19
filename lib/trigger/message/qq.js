import message from "../message";
export default class extends message {
    constructor(ctx) {
        ctx.content = ctx.content.replace(/<[^>]*>/gi, '').trim();
        ctx.content = ctx.content.replace('/', '');
        console.log('[qq-收到消息]', ctx.content);
        super(ctx, 'qq');
    }
    send() {
        super.send();
    }
    get_name() {
        return '匿名用户';
    }
    At() {
        return '@' + this.get_name();
    }
}
