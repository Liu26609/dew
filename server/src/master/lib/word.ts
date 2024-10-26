import xlsxToJson from "../../model/xlsxToJson";
import { _att_key } from "../../shared/protocols/shareFace";
import cfg_eff from "../cfg/skillCfg/eff_Cfg";
import game_map from "../manage/map";
import { battle } from "./battle/battle";
import common from "./common";
import ET, { ET_K } from "./ET";
import { SKILL_rang, SKILL_eff_type, SKILL_eff_type_伤害类, SKILL_eff_type_增益类, SKILL_eff_path, SKILL_target } from "./face/FACE_SKILL";
import { effect } from "./skill/effect/effect_base";
import { body_bar, att_val } from "./unity/base/body_com";
import { monster } from "./unity/monster";
import { unity } from "./unity/unity";
const path = require('path');

class EffectFactory {
    static async createEffect(classPath, data) {
        const module = await import(classPath);
        const EffectClass = module.default;
        return new EffectClass(data);
    }
}
/**
 * 事件管理器
 */
class word {
    /**
     * 效果缓存
     */
    private effectTempMap: Map<string, any> = new Map();
    battleMap: Map<number, battle> = new Map();
    private _start = false;
    private _maps: Map<string, game_map> = new Map();
    constructor() {

    }
    async start() {
        if (this._start) {
            return;
        }
        this._start = true;
        console.info('世界启动!')
        this._startBattleTick();
        this._et();

        this.createMap('主神空间');
    }
    att_import_cfg(cfg: any, pass: _att_key[], rang: number = 0, base = 1) {
        let arry: any = [];
        for (const key in cfg) {
            if (typeof (_att_key[key]) == 'undefined') {
                continue;
            }
            if (pass.indexOf(_att_key[key]) == -1) {
                continue;
            }
            let data = cfg[key] * base;
            let value = common.random(data - cfg[key] * rang / 100, data + cfg[key] * rang / 100);
            value = Math.min(value, data); // 确保值不为负数
            arry.push(new att_val({ key: key as _att_key, val: value || 0 }))
            // switch (key) {
            //     case _att_key.物理攻击:
            //     case _att_key.物理防御:
            //     case _att_key.魔法攻击:
            //     case _att_key.魔法防御:
            //     case _att_key.技能急速:
            //     case _att_key.物理暴击率:
            //     case _att_key.魔法暴击率:
            //     case _att_key.物理护盾:
            //     case _att_key.魔法护盾:
            //     case _att_key.生命护盾:
            //         arry.push(new att_val({ key: key, val: value || 0 }))
            //         break;
            //     default:
            //         break;
            // }
        }
        return arry;
    }
    createMonster(cfg: any, option = { leve: 1, diff: 1 }) {
        let data: any = {};
        option.diff = option.diff / 10;
        data.name = cfg.name;
        data.attList = [];
        let arry = []
        arry = this.att_import_cfg(cfg, [
            _att_key.生命值,
            _att_key.生命恢复,
            _att_key.魔法值,
            _att_key.魔法恢复,
            _att_key.物理攻击,
            _att_key.魔法攻击,
            _att_key.物理防御,
            _att_key.魔法防御,
            _att_key.技能急速,
            _att_key.物理暴击率,
            _att_key.魔法暴击率,
        ], option.leve * option.diff * 100, option.leve * option.diff)
        data.attList = data.attList.concat(arry);

        data.sk_active = [];
        let cls = new monster(data)
        cls.inherit.reset(data.sys)
        cls.set_fall(cfg.fall)
        if (cfg.sk_active) {
            const groups = cfg.sk_active.split('\n');
            for (const group of groups) {
                const parts = group.split('as');
                let temp = parts[0]
                let rename = parts[1]
                cls.addSk_active({ name: temp, data: { rename: rename } }); // Uncomment and modify this line as needed
            }
        } else {
            cls.addSk_active({ name: '普通攻击', data: { rename: 'error' } });
        }
        return cls
    }
    createMap(id: string) {
        let cfgMap = xlsxToJson.cfg;
        let monsterCfg = cfgMap.get(`map_${id}`)
        const map = new game_map(id);
        map.set_monsterCfg(monsterCfg)
        this._maps.set(id, map);
        return map;
    }
    /**
     * 获取玩家当前所在地图
     * @param name 
     * @returns 
     */
    getMap(name: string | undefined): game_map {
        if (!name) {
            name = '主神空间';
        }
        if (!this._maps.has(name)) {
            this.createMap(name)
        }
        return this._maps.get(name) as game_map;
    }
    private register_battle(data: battle) {
        console.info(`[战场]注册:${data.id}`)
        this.battleMap.set(data.id, data);
    }
    private dregister_battle(id: number) {
        if (!this.battleMap.has(id)) {
            return;
        }
        console.info(`[战场]销毁:${id}`)
        this.battleMap.delete(id);
    }

    private _et() {
        ET.listen(ET_K.battle_create, this.register_battle.bind(this))
        ET.listen(ET_K.battle_destroy, this.dregister_battle.bind(this))
    }
    async createEffectByType(classPath, data) {
        return await EffectFactory.createEffect(classPath, data);
    }
    /**
     * 获取技能效果
     * @param keys 
     * @param data 
     * @returns 
     */
    get_effectTemp(data: any): effect | null {
        let o_data = cfg_eff.get(data.id)
        let effectPath = path.resolve(__dirname, `./skill/effect/${o_data.tag.join('/')}`);
        let temp = this.effectTempMap.get(effectPath);
        if (temp) {
            return new temp(o_data.tag, o_data.target, o_data.data);
        }
        try {
            const effectModule = require(`${effectPath}`);
            const EffectClass = effectModule.default;
            this.effectTempMap.set(effectPath, EffectClass);
            return new EffectClass(o_data.tag, o_data.target, o_data.data);
        } catch (error) {
            console.error(`[技能效果不存在]${o_data.id}`)
            return null;
        }
    }

    private async _startBattleTick() {
        const batchSize = 10; // 每批处理的 battle 数量
        const delayBetweenBatches = 5000; // 每批处理的延迟时间，单位为毫秒
        const tickTime = 100;
        let currentId = 0;
        let batchCont = 0;
        while (true) {
            if (this.battleMap.size === 0) {
                await common.sleep(tickTime);
                continue; // 跳过本次循环，等待下一次
            }
            let list = Array.from(this.battleMap.values());
            for (let index = 0; index < list.length; index++) {
                const element = list[index];
                if (currentId > element.id) {
                    continue;
                }
                if (element.moment) {
                    continue;
                }
                currentId = element.id;
                element.tick();
                batchCont += 1;
                if (batchCont < batchSize) {
                    batchCont = 0;
                    await common.sleep(delayBetweenBatches)
                }
            }
            currentId = 0;
            batchCont = 0;
            await common.sleep(tickTime);
        }
    }



}
export default new word();