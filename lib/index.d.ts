import { Context, Schema } from 'koishi';
export declare const name = "dew-bot";
export interface Config {
    调试模式: boolean;
    服务器地址: string;
}
export declare let logger: any;
export declare const Config: Schema<Config>;
export declare let CFG: Config;
export declare function apply(ctx: Context, config: Config): Promise<void>;
