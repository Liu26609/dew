import master from "./master"
import xlsxToJson from "./model/xlsxToJson"
import db from "./model/db/db";
import { test_battle } from "./master/lib/battle/test.battle";
import { battle } from "./master/lib/battle/battle";
import { battle_group } from "./master/lib/face/FACE_BODY";
import word from "./master/lib/word";
import common from "./master/lib/common";
import ET, { ET_K } from "./master/lib/ET";
const http = require('https');
async function start() {
    // xlsxToJson.init()
    await db.init();
        // await server_mail.startServer(true);
        word.start()
        await master.startServer();
        let t = new test_battle()

        let a = t.create_unity()
        let b = t.create_unity()
        let c = new battle()
        c.join(battle_group.主场, a)
        c.join(battle_group.客场, b)
        c.join(battle_group.客场, t.create_unity())
        let ls = {
            game_over: (b: battle) => {
                let sklog = b.get_log(a.get_group())
                console.log('战斗结束', sklog)
            }
        }
        c.start(ls)
        // await server_rank.startServer(true);
        // Pull()
        // const leaveHandler =(data:any)=>{
        //     console.log('离开战场')
        // };
        // ET.listen(ET_K.battle_leave, leaveHandler);
        // ET.fire(ET_K.battle_leave, 'data');

        // ET.rm(ET_K.battle_leave, leaveHandler);
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