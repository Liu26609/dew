import game_map from "../manage/map";
import { battle } from "./battle/battle";
import common from "./common";
import ET, { ET_K } from "./ET";
import { _att_key } from "./face/FACE_BODY";
import { SKILL_rang, SKILL_eff_type, SKILL_eff_type_伤害类, SKILL_eff_type_增益类, SKILL_eff_path, SKILL_target, SKILL_type } from "./face/FACE_SKILL";
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
        await this._initSkillCl();
        this._startBattleTick();
        this._et();

        this.createMap({ name: '主神空间',id:common.v4() });
    }
    createMonster(cfg:any){
        let data: any = {};
        data.name = `测试怪物${common.random(1000, 9999)}`;
        data.attList = [];
        data.attList.push(new body_bar({ name: '生命值', key: _att_key.生命, max: 100, now: 100 }))
        data.attList.push(new att_val({ name: '攻击力', key: _att_key.物理攻击, val: 10 }))
        data.attList.push(new att_val({ name: '防御力', key: _att_key.物理防御, val: 10 }))


        data.sk_active = [];
        data.sk_active.push({
            name: '测试技能',
            type: SKILL_type.主动技能,
            target: SKILL_target.敌人,
            desc: '对单个敌人造成(攻击力*1.5+测试力)物理伤害',
            cd: 1,
            rang_type: SKILL_rang.单体伤害,
            rang_num: 1,
            effects: [{
                tag: [SKILL_eff_path.动作, SKILL_eff_type.伤害类, SKILL_eff_type_伤害类.物理伤害],
                data: {
                    // 数值
                    val_str: `攻击力*0.8+测试力`
                }
            }]
        })

        data.sk_active.push({
            name: '大招',
            type: SKILL_type.主动技能,
            target: SKILL_target.敌人,
            desc: '对5个敌人造成(攻击力*2+测试力)物理伤害,并持续2回合+30%概率暴击',
            cd: 5,
            rang_type: SKILL_rang.范围伤害,
            rang_num: 5,
            effects: [
                {
                    tag: [SKILL_eff_path.buff, SKILL_eff_type.增益类, SKILL_eff_type_增益类.附加暴击],
                    target: SKILL_target.自己,
                    data: {
                        //buff name
                        name:'残暴',
                        // 持续回合
                        round: 2,
                        // 数值
                        val_str: `30`
                    }
                },
                {
                    tag: [SKILL_eff_path.动作, SKILL_eff_type.伤害类, SKILL_eff_type_伤害类.物理伤害],
                    target: SKILL_target.敌人,
                    data: {
                        // 数值
                        val_str: `攻击力*0.5+测试力`
                    }
                }]
        })
        return new monster(data)
    }
    createMap(data: any) {
        const map = new game_map(data);
        this._maps.set(map.name, map);
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
    get_effectTemp(keys: string[], script: any, data: any): effect | null {
        // 将 keys 数组中的字符串通过 '_' 拼接
        const key = keys.join('_');

        // 从 effectTempMap 中获取对应的效果类
        const EffectClass = this.effectTempMap.get(key);

        if (EffectClass) {
            // 动态实例化该效果类
            return new EffectClass(keys, script, data);
        } else {
            console.info(`!!!Effect class not found for key: ${key}`);
            return null;
        }
    }
    // 动态创建基于效果类型的实例
    private async _initSkillCl() {
        await this._initSkillCls(SKILL_eff_type.伤害类, SKILL_eff_type_伤害类);
        await this._initSkillCls(SKILL_eff_type.增益类, SKILL_eff_type_增益类);
    }
    private async _initSkillCls(key: string, types: any) {
        const effectTypes = Object.values(types);
        for (const effectType of effectTypes) {
            const actionPath = path.resolve(__dirname, `./skill/effect/action/${key}/${effectType}`);
            try {
                const effectModule = require(`${actionPath}.ts`);
                const EffectClass = effectModule.default;
                this.effectTempMap.set(`action_${key}_${effectType}`, EffectClass);
            } catch (error) {
                console.error(`[技能注册:action]${key}/${effectType}`);
            }

            const buffPath = path.resolve(__dirname, `./skill/effect/buff/${key}/${effectType}`);
            try {
                const effectModule = require(`${buffPath}.ts`);
                const EffectClass = effectModule.default;
                this.effectTempMap.set(`buff_${key}_${effectType}`, EffectClass);
            } catch (error) {
                console.error(`[技能注册:buff]${key}/${effectType}`);
            }
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