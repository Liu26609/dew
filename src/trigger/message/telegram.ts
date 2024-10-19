import { logger } from "../../index_bot";
import message from "../message";

export default class extends message {
    constructor(ctx: any) {
        logger.log('[telegram-收到消息]', ctx.content)
        super(ctx, 'telegram')

    }
}