import app, { xlsxCfgNames } from "../../../app";
import db from "../../../model/db/db";
import { player } from "../../../model/fight/body/player";
import { logger } from "../../../model/server/logger";
import { team } from "../lib/team";
const cron = require('node-cron');
class manage_team {
    teamMap: Map<string, team> = new Map();
    constructor() {

    }
    init() {
        // 加载配置表中的小队列表
        this.loadTeamCfg();
        cron.schedule('0 0 * * *', () => {
            console.log('每天凌晨执行的任务');
            this.teamMap.forEach(element => {
                element.grantGift()
            });
        });
        cron.schedule('0 2 * * 5', () => {
            console.log('每天凌晨执行的任务');
            this.teamMap.forEach(element => {
                element.selectCaptain()
            });
        });
    }
    private async loadTeamCfg() {
        let list = app.xlsxCfgMap.get(xlsxCfgNames.小队表) as Map<string, any>;
        const sql = 'SELECT * FROM team';
        let data = await db.sql(sql, []) as any[];
        // 加载数据库
        let teamList = [...list.values()];
        for (let i = 0; i < teamList.length; i++) {
            const element = teamList[i];
            let sqData = data.find((item) => {
                return item.id == element.id
            })
            if (sqData) {
                this.createTeam(sqData.data)
            } else {
                this.createTeam(element)
            }
        }
    }
    private createTeam(data: any) {
        this.teamMap.set(data.id, new team(data));
    }
    join_team(body: player, team_id: string) {
        let _team = this.teamMap.get(team_id);
        if (!_team) {
            logger.error('小队已不存在')
            return;
        }
        _team.join(body);
        return _team;
    }
    getTeam(body: player) {
        return this.teamMap.get(body.team_id);
    }
}
export default new manage_team();