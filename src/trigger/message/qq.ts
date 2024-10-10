import message from "../message";

export default class extends message {
    constructor(ctx: any) {
        ctx.content = ctx.content.replace(/<[^>]*>/gi, '').trim();
        ctx.content = ctx.content.replace('/','')
        console.log('[qq-收到消息]', ctx.content)
        super(ctx, 'qq')
        this.addLine('~')
    }
    send(): void {
        super.send()
    }
    get_name() {
        return '匿名用户';
    }
}