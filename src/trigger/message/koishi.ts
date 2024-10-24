import { log } from "../..";
import message from "../message";

export default class extends message {
    constructor(ctx: any) {
        log.info('[koishi-收到消息]', ctx.content)
        super(ctx, 'koishi')
    }
}