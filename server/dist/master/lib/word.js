"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsxToJson_1 = __importDefault(require("../../model/xlsxToJson"));
const shareFace_1 = require("../../shared/shareFace");
const map_1 = __importDefault(require("../manage/map"));
const common_1 = __importDefault(require("./common"));
const ET_1 = __importStar(require("./ET"));
const FACE_SKILL_1 = require("./face/FACE_SKILL");
const body_com_1 = require("./unity/base/body_com");
const monster_1 = require("./unity/monster");
const path = require('path');
class EffectFactory {
    static createEffect(classPath, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const module = yield (_a = classPath, Promise.resolve().then(() => __importStar(require(_a))));
            const EffectClass = module.default;
            return new EffectClass(data);
        });
    }
}
/**
 * 事件管理器
 */
class word {
    constructor() {
        this.effectTempMap = new Map();
        this.battleMap = new Map();
        this._start = false;
        this._maps = new Map();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._start) {
                return;
            }
            this._start = true;
            console.info('世界启动!');
            yield this._initSkillCl();
            this._startBattleTick();
            this._et();
            this.createMap('主神空间');
        });
    }
    att_import_cfg(cfg, pass, rang = 0, base = 1) {
        let arry = [];
        for (const key in cfg) {
            if (typeof (shareFace_1._att_key[key]) == 'undefined') {
                continue;
            }
            if (pass.indexOf(shareFace_1._att_key[key]) == -1) {
                continue;
            }
            let data = cfg[key] * base;
            let value = common_1.default.random(data - cfg[key] * rang / 100, data + cfg[key] * rang / 100);
            value = Math.min(value, data); // 确保值不为负数
            arry.push(new body_com_1.att_val({ key: key, val: value || 0 }));
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
    createMonster(cfg, option = { leve: 1, diff: 1 }) {
        let data = {};
        option.diff = option.diff / 10;
        data.name = cfg.name;
        data.attList = [];
        let arry = [];
        arry = this.att_import_cfg(cfg, [
            shareFace_1._att_key.生命值,
            shareFace_1._att_key.生命恢复,
            shareFace_1._att_key.魔法值,
            shareFace_1._att_key.魔法恢复,
            shareFace_1._att_key.物理攻击,
            shareFace_1._att_key.魔法攻击,
            shareFace_1._att_key.物理防御,
            shareFace_1._att_key.魔法防御,
            shareFace_1._att_key.技能急速,
            shareFace_1._att_key.物理暴击率,
            shareFace_1._att_key.魔法暴击率,
        ], option.leve * option.diff * 100, option.leve * option.diff);
        data.attList = data.attList.concat(arry);
        data.sk_active = [];
        let cls = new monster_1.monster(data);
        if (cfg.sk_active) {
            const groups = cfg.sk_active.split('\n');
            for (const group of groups) {
                const parts = group.split('as');
                let temp = parts[0];
                let rename = parts[1];
                cls.addSk_active({ name: temp, data: { rename: rename } }); // Uncomment and modify this line as needed
            }
        }
        else {
            cls.addSk_active({ name: '普通攻击', data: { rename: 'error' } });
        }
        return cls;
    }
    createMap(id) {
        let cfgMap = xlsxToJson_1.default.cfg;
        let monsterCfg = cfgMap.get(`map_${id}`);
        const map = new map_1.default(id);
        map.set_monsterCfg(monsterCfg);
        this._maps.set(id, map);
        return map;
    }
    /**
     * 获取玩家当前所在地图
     * @param name
     * @returns
     */
    getMap(name) {
        if (!name) {
            name = '主神空间';
        }
        if (!this._maps.has(name)) {
            this.createMap(name);
        }
        return this._maps.get(name);
    }
    register_battle(data) {
        console.info(`[战场]注册:${data.id}`);
        this.battleMap.set(data.id, data);
    }
    dregister_battle(id) {
        if (!this.battleMap.has(id)) {
            return;
        }
        console.info(`[战场]销毁:${id}`);
        this.battleMap.delete(id);
    }
    _et() {
        ET_1.default.listen(ET_1.ET_K.battle_create, this.register_battle.bind(this));
        ET_1.default.listen(ET_1.ET_K.battle_destroy, this.dregister_battle.bind(this));
    }
    createEffectByType(classPath, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield EffectFactory.createEffect(classPath, data);
        });
    }
    /**
     * 获取技能效果
     * @param keys
     * @param data
     * @returns
     */
    get_effectTemp(keys, script, data) {
        // 将 keys 数组中的字符串通过 '_' 拼接
        const key = keys.join('_');
        // 从 effectTempMap 中获取对应的效果类
        const EffectClass = this.effectTempMap.get(key);
        if (EffectClass) {
            // 动态实例化该效果类
            return new EffectClass(keys, script, data);
        }
        else {
            debugger;
            return null;
        }
    }
    // 动态创建基于效果类型的实例
    _initSkillCl() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._initSkillCls(FACE_SKILL_1.SKILL_eff_type.伤害类, FACE_SKILL_1.SKILL_eff_type_伤害类);
            yield this._initSkillCls(FACE_SKILL_1.SKILL_eff_type.增益类, FACE_SKILL_1.SKILL_eff_type_增益类);
        });
    }
    _initSkillCls(key, types) {
        return __awaiter(this, void 0, void 0, function* () {
            const effectTypes = Object.values(types);
            for (const effectType of effectTypes) {
                const actionPath = path.resolve(__dirname, `./skill/effect/action/${key}/${effectType}`);
                try {
                    const effectModule = require(`${actionPath}`);
                    const EffectClass = effectModule.default;
                    this.effectTempMap.set(`action_${key}_${effectType}`, EffectClass);
                }
                catch (error) {
                    console.error(`[技能注册:action]${key}/${effectType}`);
                }
                const buffPath = path.resolve(__dirname, `./skill/effect/buff/${key}/${effectType}`);
                try {
                    const effectModule = require(`${buffPath}`);
                    const EffectClass = effectModule.default;
                    this.effectTempMap.set(`buff_${key}_${effectType}`, EffectClass);
                }
                catch (error) {
                    console.error(`[技能注册:buff]${key}/${effectType}`);
                }
            }
        });
    }
    _startBattleTick() {
        return __awaiter(this, void 0, void 0, function* () {
            const batchSize = 10; // 每批处理的 battle 数量
            const delayBetweenBatches = 5000; // 每批处理的延迟时间，单位为毫秒
            const tickTime = 100;
            let currentId = 0;
            let batchCont = 0;
            while (true) {
                if (this.battleMap.size === 0) {
                    yield common_1.default.sleep(tickTime);
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
                        yield common_1.default.sleep(delayBetweenBatches);
                    }
                }
                currentId = 0;
                batchCont = 0;
                yield common_1.default.sleep(tickTime);
            }
        });
    }
}
exports.default = new word();
