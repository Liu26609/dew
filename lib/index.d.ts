import { Context, Schema } from 'koishi';
export declare const name = "dew-bot";
export interface Config {
    调试模式: boolean;
    图片压缩服务器: string;
    忽略指令空格: boolean;
    服务器地址: string;
    wss: boolean;
}
export declare let log: any;
export declare const inject: string[];
export declare const Config: Schema<Config>;
export declare let CFG: Config;
export declare function apply(ctx: Context, config: Config): Promise<void>;
export declare function reg_ignoreSeperator(ctx: Context, config: Config): void;
