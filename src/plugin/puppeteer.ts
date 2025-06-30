import fs from 'fs';
import { Context, h } from 'koishi'
import server from './server';
const path = require('path');
import { console } from './console';
import { Config } from '..';
class puppeteer extends console{
    commonCss: string;
    pageContents = new Map<string, string>()
    private ctx: any;
    private tempDir: string;
    init(ctx: Context,config: Config) {
        super.init(ctx)
        this.ctx = ctx;
        this.log('初始化 puppeteer')
        const pagesDir = path.resolve(__dirname, '../html/page');
        const files = fs.readdirSync(pagesDir);
        this.tempDir = path.resolve(path.resolve(__dirname, '../html/'), 'temp');
        files.forEach(file => {
            const filePath = path.join(pagesDir, file);
            if (fs.lstatSync(filePath).isFile()) {
                let content = fs.readFileSync(filePath, 'utf-8');
                // 移除HTML注释
                content = content.replace(/<!--[\s\S]*?-->/g, '');
                let key = file.replace('.html', '');
                this.pageContents.set(key, content);
            }
        });
        // 如果tempDir不存在，则创建
        if (!fs.existsSync(this.tempDir)) {
            fs.mkdirSync(this.tempDir, { recursive: true });
        }else{
            // 删除tempDir下的所有文件
            fs.readdirSync(this.tempDir).forEach(file => {
                fs.unlinkSync(path.resolve(this.tempDir, file));
            });
        }
    }
 
    async render(name: string, data: any) {
        let tempHtml = this.pageContents.get(name).replace(/let data = \{[^]*?\};/,`let data = ${JSON.stringify(data)};`);
            // 随机生成一个文件名
            let randomName = `${name}_${Math.random().toString(36).substring(2, 15)}.html`;
            const savePath = path.resolve(this.tempDir, randomName);
            fs.writeFileSync(savePath, tempHtml, 'utf-8');
            const page = await this.ctx.puppeteer.page();
            const filePath = path.resolve(this.tempDir, randomName);
            await page.goto(`file://${filePath}`, { waitUntil: 'networkidle2' });
            const leaderboardElement = await page.$('body');
            const boundingBox = await leaderboardElement.boundingBox();
            if(boundingBox.height > 0 || boundingBox.width > 0){
                await page.setViewport({
                    width: Math.ceil(boundingBox.width),
                    height: Math.ceil(boundingBox.height),
                });
            }
        try {
            const imgBuf = await leaderboardElement.screenshot({ captureBeyondViewport: false, type: 'jpeg' });
            let sendBuff = new Uint8Array(imgBuf);
            page.close();
            let leaderboardImage;
            // if (sendBuff.length < 200 * 1024) { // 如果小于200kb
                this.log(`not compress ${sendBuff.length / 1024}KB`);
                leaderboardImage = h.image(sendBuff, 'image/jpeg');
            // } else {
                // let req = await server.api('open/CompressImg', { imgBuf: sendBuff });
                // this.log(`compress ${req.imgBuf.length / 1024}KB`);
                // leaderboardImage = h.image(req.imgBuf, 'image/jpeg');
            // }
            return leaderboardImage;
        } catch (error) {
            page.close();
            this.log(error)
        }
    }
}

export default new puppeteer();