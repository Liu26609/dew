import { Context, Schema } from 'koishi';
export declare const name = "dew-bot";
export interface Config {
    测试参数: string;
}
export declare let logger: any;
export declare const Config: Schema<Config>;
export declare function apply(ctx: Context): void;
