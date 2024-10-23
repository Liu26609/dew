"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CFG = exports.Config = exports.inject = exports.log = exports.name = void 0;
exports.apply = apply;
exports.reg_ignoreSeperator = reg_ignoreSeperator;
const koishi_1 = require("koishi");
const bot_logic_1 = __importDefault(require("./trigger/bot_logic"));
const ET_1 = __importDefault(require("./lib/ET"));
const server_1 = __importDefault(require("./server"));
const inputManage_1 = __importDefault(require("./inputManage"));
const common_1 = __importDefault(require("./lib/common"));
const actionCfg_1 = __importDefault(require("./cfg/actionCfg"));
const trie_1 = require("./lib/trie");
exports.name = 'dew-bot';
const path = require('path');
exports.inject = ['puppeteer'];
exports.Config = koishi_1.Schema.object({
    调试模式: koishi_1.Schema.boolean().default(false).description('个人开发调试用'),
    忽略指令空格: koishi_1.Schema.boolean().default(true).description('默认允许省略指令名后的空格'),
    服务器地址: koishi_1.Schema.string().default('ws://139.159.214.249:8848')
    // 139.159.214.249
});
async function apply(ctx, config) {
    exports.CFG = config;
    exports.log = ctx.logger('[game]');
    // console.log(ctx.puppeteer)
    ctx.on('dispose', () => {
        // 修复热重载 监听残留
        ET_1.default.removeAllListeners();
        // 在插件停用时关闭端口
        server_1.default.dispose();
    });
    if (exports.CFG.调试模式) {
        exports.CFG.服务器地址 = 'ws://127.0.0.1:8848';
        exports.log.info('调试模式-将调用本地服务器');
    }
    reg_ignoreSeperator(ctx, config);
    for (let index = 0; index < actionCfg_1.default.length; index++) {
        const element = actionCfg_1.default[index];
        let cls = ctx.command(element.key, `💡${element.key_tips}`);
        // option 不适合本机器人
        // if (element.option) {
        // cls.option('改名', '<val:string>')
        // }
        if (element.tips.length > 0) {
            cls.usage(`════🔵指令描述═━┄\n${element.tips}`);
        }
        if (element.example.length > 0) {
            cls.example(`✨别忘了指令的空格哦✨`);
            for (let i = 0; i < element.example.length; i++) {
                const example = element.example[i];
                cls.example(`🌰${example}`);
            }
        }
        cls.action(async (_, ag) => {
            const classPath = path.resolve(__dirname, `./action/${element.path}`);
            let msg = inputManage_1.default.get_msg(_.session.messageId);
            common_1.default.importClass(classPath, [msg, ..._.args]);
            const page = await ctx.puppeteer.page();
            const tempHtml = `file://${path.resolve(__dirname, './html/page/skill.html')}`;
            await page.goto(tempHtml, { waitUntil: 'networkidle2' });
            // 传递数据到网页
            const dataToPass = { key: 'value', anotherKey: 'anotherValue' };
            await page.evaluate((data) => {
                // 在页面上下文中执行的代码
                window.dataFromNode = data;
            }, dataToPass);
            const leaderboardElement = await page.$('body');
            const boundingBox = await leaderboardElement.boundingBox();
            await page.setViewport({
                width: Math.ceil(boundingBox.width),
                height: Math.ceil(boundingBox.height),
            });
            const imgBuf = await leaderboardElement.screenshot({ captureBeyondViewport: false });
            const leaderboardImage = koishi_1.h.image(imgBuf, 'image/png');
            await _.session.send(leaderboardImage);
            await page.close();
        });
    }
    ctx.on('ready', async () => {
        if (!server_1.default.init) {
            await server_1.default.setWsUrl(exports.CFG.服务器地址);
        }
        inputManage_1.default.init();
    });
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
        console.log('[ctx-转换前]', session.content);
        session.content = session.content.toLowerCase();
        session.content = session.content.replace('/', '');
        session.content = session.content.replace('hp', ' -h');
        // '<at id="4708089599809513869"> 属性</at>'
        session.content = session.content.replace(/<[^>]*>/gi, '').trim();
        console.log('[ctx-转换后]', session.content);
        return next();
    }, true);
    ctx.on('message', async (session) => {
        let _logic = new bot_logic_1.default(session);
        let msg = _logic.getCls_msg(session);
        inputManage_1.default.input_msg(msg);
    });
}
function reg_ignoreSeperator(ctx, config) {
    const trie = new trie_1.Trie();
    const applyCommand = async (command) => {
        if (!command)
            return;
        await Promise.resolve();
        const aliases = [...Object.keys(command._aliases), ...Object.keys(command.config['aliases'] ?? {})];
        for (const name of aliases) {
            trie.insert(name);
        }
        command._disposables.push(() => aliases.splice(0, aliases.length).forEach(trie.remove.bind(trie)));
    };
    ctx.$commander._commandList.forEach(applyCommand);
    ctx.on('command-added', applyCommand);
    ctx.on('command-updated', applyCommand);
    ctx.middleware(async (session, next) => {
        const key = trie.prefixes(koishi_1.Command.normalize(session.stripped.content?.split(' ')[0] ?? ''))
            .filter((key) => ctx.$commander.get(key)?.config['忽略指令空格'] ?? exports.CFG.忽略指令空格)?.[0];
        if (!key)
            return next();
        await session.execute([session.stripped.content.slice(0, key.length), session.stripped.content.slice(key.length)].join(' '), next);
    });
}
