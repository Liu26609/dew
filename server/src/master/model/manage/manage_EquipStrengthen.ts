import app, { xlsxCfgNames } from "../../../app"
import { player } from "../../../model/fight/body/player"
import { equip } from "../../../model/fight/equip/equip"
import { Tpl_Equip_strengthen, template } from "../../../shared/master/MsgAction"
/**
 * 铁匠铺管理
 */
export class manage_EquipStrengthen {
    private lastLookMap: Map<string, equip> = new Map()
    constructor() {

    }
    update(uuid: string, equip: equip) {
        this.lastLookMap.set(uuid, equip)
    }
    clear(uuid, e?: equip) {
        let log = this.lastLookMap.get(uuid)
        if (log && log.uuid && e?.uuid) {
            this.lastLookMap.delete(uuid)
        }
    }
    get(uuid: string) {
        return this.lastLookMap.get(uuid);
    }

    strengthen(user: player, e: equip) {
        let att_last = e.getAttributes()
        let jude = e.strengthen_start(false)
        let att_now = e.getAttributes()
        let tpl:Tpl_Equip_strengthen = {
            jude: jude,
            typeTitle:'强化',
            info: {
                name: e.name,
                leve: e.leve.num,
                score: e.getScore()
            },
            att_last: att_last,
            att_now: att_now
        }
        user.sendMsg(template.强化面板,tpl)
    }
    resetting(user: player, e: equip){
        let att_last = e.getAttributes()
        e.score = e.score + app.random(-5, 10);
        e.random(e.score);
        let att_now = e.getAttributes()
        let tpl:Tpl_Equip_strengthen = {
            jude: true,
            typeTitle:'重铸',
            info: {
                name: e.name,
                leve: e.leve.num,
                score: e.getScore()
            },
            att_last: att_last,
            att_now: att_now
        }
        user.sendMsg(template.强化面板,tpl)
    }
}
export default new manage_EquipStrengthen()