import app, { xlsxCfgNames } from "../app";
import god from "../god";
import db from "../model/db/db";
import { rank_type, rank_typeName } from "../shared/interface"
const cron = require('node-cron');
export class logic {
    constructor() {

    }
    init() {
        cron.schedule('0 6 * * 0', () => {
            console.log('排行榜结算');
            this.settlements()
        });
    }
    /**
     * 结算
     */
    async settlements() {
        let date = new Date();
        let month = date.getMonth() + 1; // 月份是从0开始的，所以需要加1
        let day = date.getDate();
        let cfg_rankList = [...(app.xlsxCfgMap.get(xlsxCfgNames.排行榜奖励配置) as Map<string, any>).values()]

        for (const key in rank_typeName) {
            const rankName = rank_typeName[key];
            const rankType = rank_type[key];
            console.log(rankName, rankType);
            let rankList = await db.sql(`SELECT * 
 FROM rank 
 WHERE type = ${rankType} 
 ORDER BY num DESC 
 LIMIT 1000`, []) as any[]

            for (let index = 0; index < rankList.length; index++) {
                const element = rankList[index];
                const uuid = (element.uuid as string).split('$')[0];
                const name = element.name;
                let rankInfo: any = undefined;

                for (let i = 0; i < cfg_rankList.length; i++) {
                    const now_item = cfg_rankList[i];
                    const next_item = cfg_rankList[i + 1];
                    if ((index + 1) >= Number(now_item.id) && !next_item) {
                        rankInfo = now_item
                        break;
                    }
                    if ((index + 1) >= Number(now_item.id) && (index + 1) < Number(next_item.id)) {
                        rankInfo = now_item
                        break;
                    }
                }
                if (rankInfo) {
                    let item = app.createCfgItem(rankInfo.sell_id, 0, `${rankName}榜·第${index + 1}名奖励`)
                    item.set_cont(rankInfo.cont)
                    console.log(uuid)
                    // console.log(`恭喜你！${name}你在${month}月${day}日${rankName}中位于第${index + 1}名!`)
                    await god.send({ uuid: 'rank', name: '排行榜' }, uuid, rankName, `恭喜你！${name}你在：${month}月${day}日${rankName}中位于第${index + 1}名!`,
                        [item]);
                }


            }
        }
        let maps = [...app.getCfg(xlsxCfgNames.名人堂).values()];
        let rankInfo = cfg_rankList[0]
        maps.forEach(async element => {
            let item = app.createCfgItem(rankInfo.sell_id, 0, `名人堂`)
            item.set_cont(rankInfo.cont)
            await god.send({ uuid: 'hof', name: '名人堂' }, element.id, '名人堂', `名人堂每日奖励`,
                [item]);
        });


    }
}
export default new logic()