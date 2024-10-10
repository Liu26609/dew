import message from "../message";

export default class extends message {
    constructor(ctx: any) {
        console.log('[telegram-收到消息]', ctx.content)
        super(ctx, 'telegram')

    }
}