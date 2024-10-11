import xlsxToJson from "./model/xlsxToJson"
import { _getEffect, cfg_effectKey } from "./intoSkill/cfg_effect";
import server_mail from "./server_mail";
import db from "./model/db/db";
async function start() {
    xlsxToJson.init()
    try {
        await db.init();
        await server_mail.startServer(true);

    } catch (error) {
        debugger;
    }
}
start()