import { logger } from "../index";
import inputManage from "../inputManage";
import { battle_d } from "./battle/battle";
import common from "./common";
import ET, { ET_K } from "./ET";
import { SKILL_rang, SKILL_eff_type, SKILL_eff_type_伤害类 } from "./face/FACE_SKILL";
import { effect } from "./skill/effect/effect_base";
const path = require('path');
const effectMap = {
    '物理伤害': './skill/effect/伤害类/物理伤害',
    // 添加更多类映射
};
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
    private effectTempMap:Map<string,any> = new Map();
    battleMap: Map<number, battle_d> = new Map();
    private _start = false;
    constructor() {
        
    }
    async start() {
        if(this._start){
            return;
        }
        this._start = true;
        logger.info('世界启动!')
        await this._initSkillCl();
        this._startBattleTick();
        this._et();
        inputManage.init(); // 初始化输入管理器
    }

    private register_battle(data: battle_d) {
        logger.info(`[战场]注册:${data.id}`)
        this.battleMap.set(data.id, data);
    }
    private dregister_battle(id: number) {
        if(!this.battleMap.has(id)){
            return;
        }
        logger.info(`[战场]销毁:${id}`)
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
    get_effectTemp(keys: string[],data:any):effect {
        // 将 keys 数组中的字符串通过 '_' 拼接
        const key = keys.join('_');
        
        // 从 effectTempMap 中获取对应的效果类
        const EffectClass = this.effectTempMap.get(key);
        
        if (EffectClass) {
            // 动态实例化该效果类
            return new EffectClass(keys,data);
        } else {
            console.info(`!!!Effect class not found for key: ${key}`);
            return null;
        }
    }
    // 动态创建基于效果类型的实例
    private async _initSkillCl() {
        await this._initSkillCls(SKILL_eff_type.伤害类,SKILL_eff_type_伤害类);
    }
    private async _initSkillCls(key:string,types:any) {
        const effectTypes = Object.values(types);
        for (const effectType of effectTypes) {
            const classPath = path.resolve(__dirname, `./skill/effect/${key}/${effectType}`);
            try {   
                const effectModule = require(`${classPath}.ts`);
                const EffectClass = effectModule.default;
                this.effectTempMap.set(`${key}_${effectType}`, EffectClass);
            } catch (error) {
                console.error(`[技能注册]${key}/${effectType}`);
            }
        }
    }
    private async _startBattleTick() {
        const batchSize = 10; // 每批处理的 battle 数量
        const delayBetweenBatches = 100; // 每批处理的延迟时间，单位为毫秒
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