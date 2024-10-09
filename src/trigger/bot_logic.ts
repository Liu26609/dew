/**
 * 消息事件分发处理
 */
const path = require('path');
export default class bot_logic {
    cls: any;
    constructor(ctx: any) {
        console.log('事件分析', ctx)
        this.start(ctx)
    }
    private start(ctx: any) {
        // 类型判断
        try {
        let pf = this._platform(ctx)
        // 根据平台名称去引入对应的类
        const classPath = path.resolve(__dirname, `./logic/${pf}`);
        const effectModule = require(`${classPath}.ts`);
        const EffectClass = effectModule.default;
        this.cls =  new EffectClass(ctx)
         
        let type = this.cls.getType(ctx);
        const typePath = path.resolve(__dirname, `./${type}/${pf}`);
        const typeModule = require(`${typePath}.ts`);
        const typeClass = typeModule.default;
        new typeClass(ctx)
        }catch(e){ 
            console.error('事件分析错误')
        }
    }
    // 平台分析
    private _platform(ctx: any) {
        let p = 'none';
        if(ctx.platform.includes('sandbox:')){
            return 'koishi';
        }
        switch (ctx.platform) {
            case 'telegram':
                p = 'telegram';
                break;
            case 'qq':
                p = 'qq';
                break;
            default:
                break;
        }
        return p;
    }
}