import message from "../message";
export default class extends message {
    constructor(ctx) {
        console.log('[koishi-收到消息]', ctx.content);
        super(ctx, 'koishi');
    }
}
