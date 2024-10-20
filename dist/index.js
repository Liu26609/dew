"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CFG = exports.Config = exports.log = exports.name = void 0;
exports.apply = apply;
const koishi_1 = require("koishi");
const bot_logic_1 = __importDefault(require("./trigger/bot_logic"));
const ET_1 = __importDefault(require("./lib/ET"));
const server_1 = __importDefault(require("./server"));
const inputManage_1 = __importDefault(require("./inputManage"));
const common_1 = __importDefault(require("./lib/common"));
const actionCfg_1 = __importDefault(require("./cfg/actionCfg"));
exports.name = 'dew-bot';
const path = require('path');
exports.Config = koishi_1.Schema.object({
    调试模式: koishi_1.Schema.boolean().default(true),
    服务器地址: koishi_1.Schema.string().default('ws://139.159.214.249:8848')
    // 服务器地址: Schema.string().default('ws://127.0.0.1:8848')
    // 139.159.214.249
});
function apply(ctx, config) {
    return __awaiter(this, void 0, void 0, function* () {
        exports.CFG = config;
        exports.log = ctx.logger('[game]');
        ctx.on('dispose', () => {
            // 修复热重载 监听残留
            ET_1.default.removeAllListeners();
            // 在插件停用时关闭端口
            server_1.default.dispose();
        });
        for (let index = 0; index < actionCfg_1.default.length; index++) {
            const element = actionCfg_1.default[index];
            let cls = ctx.command(element.key, `💡${element.key_tips}`);
            // option 不适合本机器人
            // if (element.option) {
            //   cls.option('世界名', '<世界名> 指定进入的世界')
            // }
            if (element.tips.length > 0) {
                cls.usage(`════🔵指令描述═━┄\n${element.tips}`);
            }
            if (element.example.length > 0) {
                for (let i = 0; i < element.example.length; i++) {
                    const example = element.example[i];
                    cls.example(`🌰栗子:${example}`);
                }
            }
            cls.action((_, ag) => {
                const classPath = path.resolve(__dirname, `./action/${element.path}`);
                let msg = inputManage_1.default.get_msg(_.session.messageId);
                common_1.default.importClass(classPath, [msg, ag]);
            });
        }
        ctx.on('ready', () => __awaiter(this, void 0, void 0, function* () {
            if (!server_1.default.init) {
                yield server_1.default.setWsUrl(exports.CFG.服务器地址);
            }
            inputManage_1.default.init();
        }));
        /**
         * string: string 字符串
      number: number 数值
      bigint: bigint 大整数
      text: string 贪婪匹配的字符串
      user: string 用户，格式为 {platform}:{id} (调用时可以使用 at 元素或者 @{platform}:{id} 的格式)
      channel: string 频道，格式为 {platform}:{id} (调用时可以使用 sharp 元素或者 #{platform}:{id} 的格式)
      integer: number 整数
      posint: number 正整数
      natural: number 正整数
      date: Date 日期
      image: Dict 图片
         */
        // ctx.command('啊啊.sub <世界名:number> 进入轮回空间')
        //   .option('世界名', '<世界名> 指定进入的世界')
        //   .usage('注意：参数请写在最前面，不然会被当成 message 的一部分！')
        //   .example('开始历练 火影忍者')
        //   .action((_, ag) => {
        //     const classPath = path.resolve(__dirname, `./action/common/menu`);
        //     let msg = inputManage.get_msg(_.session.messageId)
        //     common.importClass(classPath, [msg, ag])
        //   })
        // ctx.command('开始历练 <世界名:string> 进入轮回空间')
        //   .option('世界名', '<世界名> 指定进入的世界')
        //   .usage('注意：参数请写在最前面，不然会被当成 message 的一部分！')
        //   .example('开始历练 火影忍者')
        //   .action((_, message) => {
        //     const classPath = path.resolve(__dirname, `./action/common/menu`);
        //     let msg = inputManage.get_msg(_.session.messageId)
        //     common.importClass(classPath, [msg, message])
        //   })
        ctx.middleware((session, next) => {
            session.content = session.content.toLowerCase();
            session.content = session.content.replace('hp', ' -h');
            return next();
        }, true);
        ctx.on('message', (session) => __awaiter(this, void 0, void 0, function* () {
            let _logic = new bot_logic_1.default(session);
            let msg = _logic.getCls_msg(session);
            inputManage_1.default.input_msg(msg);
        }));
    });
}
