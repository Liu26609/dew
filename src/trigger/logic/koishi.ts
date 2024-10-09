export default class {
    constructor(ctx: any) {
        
    }
    getType(ctx: any) {
        console.log(ctx)
        let t = 'none';
        switch (ctx.type) {
            case 'message-created':
                // 平台测试消息
                t = 'message';
                break;
            default:
                break;
        }
        return t;
    }
}