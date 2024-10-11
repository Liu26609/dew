import { ApiCall } from "tsrpc";
import { ReqUpdate, ResUpdate } from "../../shared/server_rank/PtlUpdate";
import db from "../../model/db/db";
import { logger } from "../../model/server/logger";
let requestDataArray: any[] = [];
// 定时器每秒处理一次数据
setInterval(async () => {
    // 检查数组是否有数据
    if (requestDataArray.length == 0) {
        return;
    }
    let data = requestDataArray.shift()
    if (data) {
        // 处理数据
        let uuid = data.uuid;
        let name = data.name;
        let type = data.type;
        let num = data.num;
        let style = data.style;

        const sql = `INSERT INTO rank (uuid, name, type, num, style)
          VALUES (?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          type = VALUES(type),
          num = VALUES(num),
          style = VALUES(style)`;
        try {
            await db.sql(sql, [`${uuid}$${type}`, name, type, num, style]);
        } catch (err) {
            console.error('数据处理失败：', err);
        }
    }
}, 100);
export default async function (call: ApiCall<ReqUpdate, ResUpdate>) {
    let data = call.req.data;
    if(isNaN(data.num)){
        logger.error('数据处理失败：', data);
        return;
    }
    requestDataArray.push(data);
}