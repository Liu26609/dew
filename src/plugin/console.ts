import { Context } from "koishi";
import { Config } from "..";

export class console {
    _log: Console;
    constructor(){
        // 调用的父类 类名
       
    }
    init(ctx: Context,config?: Config){
        let name = this.constructor.name;
        this._log = ctx.logger(`[${name}]`) as any;
    }
    log(message?: any, ...optionalParams: any[]){
        this._log.info(message, ...optionalParams);
    }
}