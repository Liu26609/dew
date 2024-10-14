import master from "./master"
import xlsxToJson from "./model/xlsxToJson"
import server_mail from "./server_mail";
import server_rank from "./server_rank";
import db from "./model/db/db";
import { test_battle } from "./master/lib/battle/test.battle";
import { battle } from "./master/lib/battle/battle";
import { battle_group } from "./master/lib/face/FACE_BODY";
import word from "./master/lib/word";
import common from "./master/lib/common";
const http = require('https');
async function start() {
    // xlsxToJson.init()
    await db.init();
    try {
        // await server_mail.startServer(true);
        word.start()
        await master.startServer();
        let t = new test_battle()

        let a = t.create_unity()
        let b = t.create_unity()
        let c = new battle()
        c.join(battle_group.主场, a)
        c.join(battle_group.客场, b)
        c.start()
        // await server_rank.startServer(true);
        // Pull()
    } catch (error) {
        debugger;
    }
}
async function Pull() {
    // 请求get 地址https://v1.hitokoto.cn/
    http.get("https://v1.hitokoto.cn/", (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', async () => {
            let result = JSON.parse(data);

            // let res = await db.sql(`INSERT INTO oneMore (str, auth)
            // SELECT ?, ?
            // FROM dual
            // WHERE NOT EXISTS (SELECT * FROM oneMore WHERE str = ?)`, [result.hitokoto, result.from, result.hitokoto]);
            console.log(result.hitokoto);
        });
    }).on('error', (err) => {
        console.error('Error fetching hitokoto:', err);
    });
    // setTimeout(() => {
    //     Pull()
    // }, app.random(1000,5000))

}
start()