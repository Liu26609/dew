import fs from 'fs';
import { h } from 'koishi'
import message from '../trigger/message';
import server_tool from '../server_tool';
import { prop_item_skill } from '../shared/master/shareFace';
const path = require('path');
import Handlebars from 'handlebars';
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
        // const commonCssFile = path.resolve(__dirname, '../html/common.css');
        // let commonCss = fs.readFileSync(commonCssFile, 'utf-8');
        // this.commonCss = commonCss;

     
        /**
         * 遍历 __dirname, '../html/page' 下的所有html文件
         * fs.readFileSync(html, 'utf-8'); 读取文件内容
         * 哈希map 全部页面
         */
        const pagesDir = path.resolve(__dirname, '../html/page');
        const files = fs.readdirSync(pagesDir);

        files.forEach(file => {
            const filePath = path.join(pagesDir, file);
            let content = fs.readFileSync(filePath, 'utf-8');
            let key = file.replace('.html', '');
            // content = content.replace('</head>', `<style>${this.commonCss}</style></head>`);
            this.pageContents.set(key, content);
        });
    }
    // 通用模板替换函数
    private renderTemplate(template: string, variables: Record<string, any>): string {
        const compiledTemplate = Handlebars.compile(template);
        return compiledTemplate(variables);
    }
    async render(cls: message, name: string, data: any) {
        let tempHtml = this.pageContents.get(name);
        tempHtml = this.renderTemplate(tempHtml, data);
        const page = await this.ctx.puppeteer.page();
        await page.setContent(tempHtml, { waitUntil: 'networkidle2' });

        // Wait for all images and fonts to load
        await page.evaluate(async () => {
            const images = Array.from(document.images);
            await Promise.all(images.map(img => {
                if (img.complete) return;
                return new Promise((resolve, reject) => {
                    img.addEventListener('load', resolve);
                    img.addEventListener('error', reject);
                });
            }));

            const fonts = document.fonts;
            await fonts.ready;
        });

        const leaderboardElement = await page.$('body');
        const boundingBox = await leaderboardElement.boundingBox();
        await page.setViewport({
            width: Math.ceil(boundingBox.width),
            height: Math.ceil(boundingBox.height),
        });
        const imgBuf = await leaderboardElement.screenshot({ captureBeyondViewport: false });
        console.log(`Original image size: ${imgBuf.length} bytes`);
        let sendBuff = new Uint8Array(imgBuf)
        let req = await server_tool.api('CompressImg', { imgBuf: sendBuff })
        console.log(`Compressed image size: ${req.imgBuf.length} bytes`);
        const leaderboardImage = h.image(req.imgBuf, 'image/jpeg');
        await cls.session.send(leaderboardImage);
        // await page.close();
    }
    async temp_prop_skill(data: prop_item_skill, cls: message) {
        const _data = {
            name: data.name,
            sk_type: data.type,
            cd: data.cd,
            desc: data.desc,
            leve: {
                num: data.leve,
                bar: `${((data.leve_exp.now / data.leve_exp.max) * 100).toFixed(2)}%`
            }
        };
        this.render(cls, 'skill', _data)

    }
}
export default new temp_img();