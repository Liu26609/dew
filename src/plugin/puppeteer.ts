import fs from 'fs';
import { Context, h } from 'koishi'
import server from './server';
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
            let tempDir = path.resolve('D:/poject/html/temp');
            // 如果tempDir不存在，则创建
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }
            // 替换 let data = 后面的数据
            tempHtml = tempHtml.replace(/let data = \{[^]*?\};/,`let data = ${JSON.stringify(data)};`);
            // 随机生成一个文件名
            let randomName = `${name}_${Math.random().toString(36).substring(2, 15)}.html`;
            const savePath = path.resolve(tempDir, randomName);
            fs.writeFileSync(savePath, tempHtml, 'utf-8');
            const page = await this.ctx.puppeteer.page();
            const filePath = path.resolve(tempDir, randomName);
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
            let sendBuff = new Uint8Array(imgBuf)
            await page.close();
            // 删除temp savePath 文件
            fs.rmSync(savePath, { recursive: true, force: true });
            // return h.image(sendBuff, 'image/jpeg');
            let req = await server.api('open/CompressImg', { imgBuf: sendBuff })
            console.log(`Compressed image size: ${req.imgBuf.length} bytes`);
            const leaderboardImage = h.image(req.imgBuf, 'image/jpeg');
            return leaderboardImage;
        } catch (error) {
            console.log(error)
        }
    }
}

export default new puppeteer();