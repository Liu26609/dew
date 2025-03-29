import fs from 'fs';
import { Context, h } from 'koishi'
const path = require('path');
class puppeteer {
    commonCss: string;
    pageContents = new Map<string, string>()
    private ctx: any;
    init(ctx: Context) {
        this.ctx = ctx;
        const pagesDir = path.resolve('D:/poject/html/page');
        const files = fs.readdirSync(pagesDir);
        files.forEach(file => {
            const filePath = path.join(pagesDir, file);
            let content = fs.readFileSync(filePath, 'utf-8');
            // 移除HTML注释
            content = content.replace(/<!--[\s\S]*?-->/g, '');
            let key = file.replace('.html', '');
            console.log(`load ${key}.html`)
            this.pageContents.set(key, content);
        });
    }
 
    async render(name: string, data: any) {
        try {
            let tempHtml = this.pageContents.get(name);
            
            // 替换 let data = 后面的数据
            tempHtml = tempHtml.replace(/let data = \{[^}]*\};/, `let data = ${JSON.stringify(data)};`);
            const page = await this.ctx.puppeteer.page();
            const filePath = path.resolve('D:/poject/html/page', `${name}.html`);
            await page.goto(`file://${filePath}`, { waitUntil: 'networkidle2' });

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
            return h.image(sendBuff, 'image/jpeg');
            // let req = await server_tool.api('CompressImg', { imgBuf: sendBuff })
            // console.log(`Compressed image size: ${req.imgBuf.length} bytes`);
            // const leaderboardImage = h.image(req.imgBuf, 'image/jpeg');
            // return leaderboardImage;
        } catch (error) {
        }
    }
}

export default new puppeteer();