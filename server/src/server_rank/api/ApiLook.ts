import { ApiCall } from "tsrpc";
import { ReqLook, ResLook } from "../../shared/server_rank/PtlLook";
import app from "../../app";
import db from "../../model/db/db";

export default async function (call: ApiCall<ReqLook, ResLook>) {
    let rankList = await db.sql(`SELECT * 
 FROM rank 
 WHERE type = ${call.req.type} 
 ORDER BY num DESC 
 LIMIT 10`, []) as any[]
    let rank = await db.sql(`SELECT 
 IFNULL(
     (
         SELECT COUNT(*) + 1
         FROM rank
         WHERE type = ${call.req.type} AND num > (
             SELECT COALESCE(MAX(num), 0) FROM rank WHERE uuid = '${call.req.uuid}$${call.req.type}'
         )
     ),
     -1
 ) AS rank`, []) as any[]

    for (let i = 0; i < 10; i++) {
        if (rankList[i]) {
            if (!rankList[i].title_style) {
                rankList[i].title_style = '1';
            }
            rankList[i].num = Number(rankList[i].num)
            continue;
        }
        rankList[i] = {
            uuid: app.v4(),
            name: '虚位以待',
            num: 0,
            type: 0,
            style: '1',
            title_style: '1'
        }
    }

    call.succ({
        query_rank: rank[0].rank,
        list: rankList
    })
}