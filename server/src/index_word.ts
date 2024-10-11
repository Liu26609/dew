import master from "./master"
import xlsxToJson from "./model/xlsxToJson"
import { _getEffect, cfg_effectKey } from "./intoSkill/cfg_effect";
import db from "./model/db/db";
import server_mail from "./server_mail";
import server_rank from "./server_rank";
async function start() {
    xlsxToJson.init()
    try {
        await db.init();
        await server_mail.startServer();
        await master.startServer();
        await server_rank.startServer();

    } catch (error) {
        debugger;
    }
}
start()