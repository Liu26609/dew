import fs from 'fs';
import { h } from 'koishi'
import message from '../trigger/message';
import server_tool from '../server_tool';
const path = require('path');
class temp_img {
    commonCss: string;
    pageContents = new Map<string, string>()
    private ctx: any;
    constructor() {

    }
    /**
     * 读取通用css文件
     * 哈希map 全部页面
     */
    init(ctx: any) {
        this.ctx = ctx;
        const commonCssFile = path.resolve(__dirname, '../html/common.css');
        let commonCss = fs.readFileSync(commonCssFile, 'utf-8');
        this.commonCss = commonCss;

        /**
         * 遍历 __dirname, '../html/page' 下的所有html文件
         * fs.readFileSync(html, 'utf-8'); 读取文件内容
         * 哈希map 全部页面
         */
        const pagesDir = path.resolve(__dirname, '../html/page');
        const files = fs.readdirSync(pagesDir);

        files.forEach(file => {
            const filePath = path.join(pagesDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            let key = file.replace('.html', '');
            this.pageContents.set(key, content);
        });
    }
    // 通用模板替换函数
    private renderTemplate(template: string, variables: Record<string, any>): string {
        return template.replace(/{{(.*?)}}/g, (_, key) => {
            const keys = key.split('.').map(k => k.trim());
            let value: any = variables;
            for (const k of keys) {
                value = value[k];
                if (value === undefined) {
                    return '';
                }
            }
            return String(value);
        });
    }
    async render(cls: message,name:string,data:any) {
        let tempHtml = this.pageContents.get(name);
        tempHtml = this.renderTemplate(tempHtml, data);
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
        let sendBuff = new Uint8Array(imgBuf)
        let req = await server_tool.api('CompressImg',{imgBuf:sendBuff})
        console.log(`Compressed image size: ${req.imgBuf.length} bytes`);
        const leaderboardImage = h.image(req.imgBuf, 'image/jpeg');
        await cls.session.send(leaderboardImage);
        await page.close();
    }
}
export default new temp_img();