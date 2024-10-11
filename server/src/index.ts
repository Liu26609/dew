import master from "./master"
import xlsxToJson from "./model/xlsxToJson"
import server_mail from "./server_mail";
import server_rank from "./server_rank";
import db from "./model/db/db";
import { test_battle } from "./master/lib/battle/test.battle";
const http = require('https');
async function start() {
    xlsxToJson.init()
    await db.init();
    try {
        // await server_mail.startServer(true);
        await master.startServer();
        let t = new test_battle()
        console.log(t.create_unity())
        master.s_wss.callApi('Ping',{})
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

            let res = await db.sql(`INSERT INTO oneMore (str, auth)
            SELECT ?, ?
            FROM dual
            WHERE NOT EXISTS (SELECT * FROM oneMore WHERE str = ?)`, [result.hitokoto, result.from, result.hitokoto]);
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