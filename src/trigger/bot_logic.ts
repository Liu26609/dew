import common from "../lib/common";

/**
 * 消息事件分发处理
 */
const path = require('path');
export default class bot_logic {
    cls: any;
    constructor(ctx: any) {
        // console.log('事件分析', ctx)
    }
    getCls_msg(ctx:any){
        let pf = this._platform(ctx)
        // 根据平台名称去引入对应的类
        const classPath = path.resolve(__dirname, `./logic/${pf}`);
        this.cls = common.importClass(classPath, [ctx])
        const typePath = path.resolve(__dirname, `./message/${pf}`);
        let cls = common.importClass(typePath, [ctx])
        return cls
    }
    private start(ctx: any) {
        // 类型判断
        try {
            let pf = this._platform(ctx)
            // 根据平台名称去引入对应的类
            const classPath = path.resolve(__dirname, `./logic/${pf}`);
            this.cls = common.importClass(classPath, [ctx])
            let type = this.cls.getType(ctx);
            const typePath = path.resolve(__dirname, `./${type}/${pf}`);
            common.importClass(typePath, [ctx])
        } catch (e) {
            ctx.send('事件分析错误')
            console.error('事件分析错误',e)
        }
    }
    // 平台分析
    private _platform(ctx: any) {
        let p = 'none';
        if (ctx.platform.includes('sandbox:')) {
            return 'koishi';
        }
        switch (ctx.platform) {
            case 'telegram':
                p = 'telegram';
                break;
            case 'qq':
                p = 'qq';
                break;
            case 'qqguild':
                p = 'qqguild'
            break;
            default:
                break;
        }
        return p;
    }
}