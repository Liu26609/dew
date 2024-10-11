import xlsxToJson from "./model/xlsxToJson"
import { _getEffect, cfg_effectKey } from "./intoSkill/cfg_effect";
import server_rank from "./server_rank";
import db from "./model/db/db";
import server_mail from "./server_mail";
async function start() {
    xlsxToJson.init()
    try {
        await db.init();
        await server_mail.startServer();
        await server_rank.startServer(true);

    } catch (error) {
        debugger;
    }
}
start()