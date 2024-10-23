"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const koishi_1 = require("koishi");
const path = require('path');
class temp_img {
    commonCss;
    pageContents = new Map();
    ctx;
    constructor() {
    }
    /**
     * 读取通用css文件
     * 哈希map 全部页面
     */
    init(ctx) {
        this.ctx = ctx;
        const commonCssFile = path.resolve(__dirname, '../html/common.css');
        let commonCss = fs_1.default.readFileSync(commonCssFile, 'utf-8');
        this.commonCss = commonCss;
        /**
         * 遍历 __dirname, '../html/page' 下的所有html文件
         * fs.readFileSync(html, 'utf-8'); 读取文件内容
         * 哈希map 全部页面
         */
        const pagesDir = path.resolve(__dirname, '../html/page');
        const files = fs_1.default.readdirSync(pagesDir);
        files.forEach(file => {
            const filePath = path.join(pagesDir, file);
            const content = fs_1.default.readFileSync(filePath, 'utf-8');
            let key = file.replace('.html', '');
            this.pageContents.set(key, content);
        });
    }
    // 通用模板替换函数
    renderTemplate(template, variables) {
        return template.replace(/{{(.*?)}}/g, (_, key) => {
            const keys = key.split('.').map(k => k.trim());
            let value = variables;
            for (const k of keys) {
                value = value[k];
                if (value === undefined) {
                    return '';
                }
            }
            return String(value);
        });
    }
    async test(cls) {
        const variables = {
            sk_type: '攻击',
            useUp: '5次',
            cd: '10',
            desc: '造成大量伤害',
            score: '95',
            leve: { num: '3', bar: '75%' }
        };
        let tempHtml = this.pageContents.get('skill');
        tempHtml = this.renderTemplate(tempHtml, variables);
        const page = await this.ctx.puppeteer.page();
        await page.setContent(tempHtml, { waitUntil: 'networkidle2' });
        const leaderboardElement = await page.$('body');
        const boundingBox = await leaderboardElement.boundingBox();
        await page.setViewport({
            width: Math.ceil(boundingBox.width),
            height: Math.ceil(boundingBox.height),
        });
        const imgBuf = await leaderboardElement.screenshot({ captureBeyondViewport: false });
        console.log(`Original image size: ${imgBuf.length} bytes`);
        // 使用 imagemin 和 imagemin-mozjpeg 压缩图像
        const leaderboardImage = koishi_1.h.image(imgBuf, 'image/jpeg');
        await cls.session.send(leaderboardImage);
        await page.close();
    }
}
exports.default = new temp_img();
